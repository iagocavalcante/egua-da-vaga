<template>
  <Page androidStatusBarBackground="#1a202c">
    <ActionBar backgroundColor="#2d3748" class="action-bar">
      <GridLayout columns="auto, *" width="100%">
        <Label col="0" class="page-title" text="Vagas Disponíveis" />
      </GridLayout>
    </ActionBar>
    
    <GridLayout rows="auto, *" backgroundColor="#f7fafc">
      <!-- Search Section -->
      <StackLayout row="0" class="search-container">
        <TextField 
          class="search-field"
          v-model="search" 
          hint="🔍 Buscar por tecnologia, empresa ou cargo..."
          returnKeyType="search"
        />
      </StackLayout>

      <!-- Loading Indicator -->
      <StackLayout row="1" v-if="isLoading" class="loading-container">
        <ActivityIndicator busy="true" class="loading-indicator"/>
        <Label text="Carregando vagas..." class="loading-text"/>
      </StackLayout>

      <!-- Jobs List -->
      <ScrollView row="1" v-else backgroundColor="#f7fafc" :key="`jobs-${repositoryName}`">
        <StackLayout class="jobs-container">
          <!-- No Jobs Message -->
          <StackLayout v-if="!displayedJobs.length && !isLoading" class="no-jobs-container">
            <Label :text="emptyStateIcon" class="no-jobs-icon"/>
            <Label :text="emptyStateTitle" class="no-jobs-title"/>
            <Label :text="emptyStateSubtitle" class="no-jobs-subtitle"/>
            <StackLayout class="empty-actions" v-if="!search || !search.trim()">
              <Label class="empty-action-button" text="🔄 Tentar Novamente" @tap="refreshJobs"/>
              <Label class="empty-suggestion" text="💡 Dica: Algumas comunidades podem não ter vagas abertas no momento"/>
            </StackLayout>
          </StackLayout>

          <!-- Job Cards -->
          <GridLayout 
            v-for="(item, index) in displayedJobs" 
            :key="index"
            class="job-card"
            rows="auto, auto, auto, auto"
            columns="*"
            @tap="openJobUrl(item.node.url)"
          >
            <!-- Job Title -->
            <Label 
              row="0" col="0"
              class="job-title" 
              textWrap="true" 
              :text="item.node.title" 
            />

            <!-- Labels/Tags -->
            <WrapLayout 
              row="1" col="0"
              class="labels-container"
              v-if="item.node.labels && item.node.labels.edges && item.node.labels.edges.length"
            >
              <Label 
                v-for="(label, i) in item.node.labels.edges.slice(0, 4)" 
                :key="i"
                class="job-label" 
                :text="label.node.name" 
                :style="`background-color: #${label.node.color}; color: ${getContrastColor(label.node.color)}`"
              />
              <Label 
                v-if="item.node.labels.edges.length > 4"
                class="job-label more-labels" 
                :text="`+${item.node.labels.edges.length - 4}`"
              />
            </WrapLayout>

            <!-- Job Description Preview -->
            <Label 
              row="2" col="0"
              class="job-description" 
              textWrap="true" 
              :text="getJobPreview(item.node.bodyHTML)"
            />

            <!-- Action Button -->
            <StackLayout row="3" col="0" class="job-actions">
              <Label class="view-job-button" text="Ver Detalhes →" />
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import { gql } from "apollo-boost";
import { openUrl } from "@nativescript/core/utils";
export default {
  props: ['repositoryName'],
  data() {
    return {
      search: '',
      searchDebounceTimer: null,
    }
  },
  computed: {
    displayedJobs() {
      // If there's a search term, show search results, otherwise show repository issues
      if (this.search && this.search.trim()) {
        const searchResults = this.repositorySearch?.search?.edges || []
        console.log('Showing search results:', searchResults.length)
        return searchResults
      }
      
      // Use Apollo's data directly (this should be reactive)
      const repositoryJobs = this.repository?.issues?.edges || []
      console.log('Showing repository jobs:', repositoryJobs.length)
      console.log('Apollo repository data:', this.repository)
      return repositoryJobs
    },
    isLoading() {
      // Check if we're loading the main repository query
      const repositoryLoading = this.$apollo.queries.repository.loading
      
      // Check if we're loading search results when there's a search term
      const searchLoading = this.search && this.search.trim() 
        ? this.$apollo.queries.repositorySearch.loading 
        : false
      
      return repositoryLoading || searchLoading
    },
    emptyStateIcon() {
      if (this.search && this.search.trim()) {
        return "🔍"
      }
      return "💼"
    },
    emptyStateTitle() {
      if (this.search && this.search.trim()) {
        return "Nenhuma vaga encontrada para sua busca"
      }
      return `Nenhuma vaga aberta no momento`
    },
    emptyStateSubtitle() {
      if (this.search && this.search.trim()) {
        return `Tente buscar por outros termos como "React", "Python", "Remote"`
      }
      return `A comunidade ${this.getRepositoryDisplayName()} não possui vagas abertas atualmente`
    },
    debugInfo() {
      return {
        repositoryExists: !!this.repository,
        repositoryIssues: this.repository?.issues,
        repositoryEdges: this.repository?.issues?.edges,
        edgesLength: this.repository?.issues?.edges?.length,
        displayedJobsLength: this.displayedJobs?.length,
        isLoading: this.isLoading,
        searchTerm: this.search
      }
    }
  },
  watch: {
    search(newValue) {
      // Clear previous timer
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer)
      }
      
      // Set new timer for debounced search
      this.searchDebounceTimer = setTimeout(() => {
        if (newValue && newValue.trim()) {
          this.$apollo.queries.repositorySearch.refetch()
        }
      }, 500) // 500ms debounce
    },
    repository: {
      handler(newValue, oldValue) {
        console.log('Repository data changed!')
        console.log('Old value:', oldValue)
        console.log('New value:', newValue)
        console.log('Jobs count:', newValue?.issues?.edges?.length || 0)
        console.log('displayedJobs will be:', this.displayedJobs?.length || 0)
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    console.log('Jobs component mounted for repository:', this.repositoryName)
    console.log('Initial repository data:', this.repository)
    console.log('Apollo queries:', Object.keys(this.$apollo.queries))
    console.log('Repository query loading:', this.$apollo.queries.repository?.loading)
    console.log('Debug info on mount:', this.debugInfo)
  },
  updated() {
    console.log('Jobs component updated!')
    console.log('Current debug info:', this.debugInfo)
  },
  methods: {
    openJobUrl(url) {
      console.log('Opening job URL:', url)
      openUrl(url)
    },
    
    getJobPreview(bodyHTML) {
      if (!bodyHTML) return 'Sem descrição disponível'
      
      // Strip HTML tags and get first 150 characters
      const text = bodyHTML.replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      
      return text.length > 150 ? text.substring(0, 150) + '...' : text
    },
    
    getContrastColor(hexColor) {
      // Convert hex to RGB
      const r = parseInt(hexColor.substr(0, 2), 16)
      const g = parseInt(hexColor.substr(2, 2), 16)
      const b = parseInt(hexColor.substr(4, 2), 16)
      
      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      
      // Return black or white based on luminance
      return luminance > 0.5 ? '#000000' : '#ffffff'
    },
    
    getRepositoryDisplayName() {
      const names = {
        'frontendbr': 'FrontEnd Brasil',
        'backend-br': 'Backend Brasil', 
        'androiddevbr': 'Android Dev Brasil',
        'CocoaHeadsBrasil': 'CocoaHeads Brasil',
        'phpdevbr': 'PHP Brasil',
        'stone-payments': 'Stone Pagamentos',
        'vuejs-br': 'Vue.js Brasil',
        'Gommunity': 'Go Community'
      }
      return names[this.repositoryName] || this.repositoryName
    },
    
    refreshJobs() {
      console.log('Refreshing jobs for repository:', this.repositoryName)
      this.$apollo.queries.repository.refetch()
    }
  },
  apollo: {
    repository: {
      query: gql`
        query repositoryListJobs ($repositoryName: String!) {
          repository(owner: $repositoryName, name:"vagas") {
            issues(first:20, states:OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
              edges {
                node {
                  title
                  url
                  bodyHTML
                  labels(first:10) {
                    edges {
                      node {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          repositoryName: this.repositoryName
        }
      },
      result(result) {
        console.log('Repository query result:', result)
        console.log('Issues found:', result.data?.repository?.issues?.edges?.length || 0)
        console.log('Apollo should now update this.repository automatically')
        
        // Force Vue to check for updates in the next tick
        this.$nextTick(() => {
          console.log('After nextTick - displayedJobs length:', this.displayedJobs?.length)
          console.log('After nextTick - repository:', this.repository)
        })
      },
      error(error) {
        console.error('Repository query error:', error)
      }
    },
    repositorySearch: {
      query: gql`
        query repositorySearchJobs ($search: String!) {
          search(first: 20, query: $search, type: ISSUE) {
            edges {
              node {
                ... on Issue {
                  title
                  url
                  bodyHTML
                  labels(first:10) {
                    edges {
                      node {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          search: `repo:${this.repositoryName}/vagas is:issue is:open ${this.search}`
        }
      },
      skip() {
        return !this.search || this.search.trim() === ''
      }
    },
  },
}
</script>

<style scoped>
/* Header Styles */
.action-bar {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  elevation: 4;
  android-elevation: 4;
}

.page-title {
  font-size: 20;
  font-weight: bold;
  color: #ffffff;
  padding-left: 20;
  font-family: system;
}

/* Search Section */
.search-container {
  background-color: #ffffff;
  padding: 16 20;
  border-bottom: 1 solid #e2e8f0;
  elevation: 1;
  android-elevation: 1;
}

.search-field {
  background-color: #f7fafc;
  border-radius: 12;
  padding: 12 16;
  font-size: 16;
  border: 1 solid #e2e8f0;
  placeholder-color: #a0aec0;
  color: #2d3748;
}

/* Loading Styles */
.loading-container {
  text-align: center;
  padding: 40;
  vertical-align: center;
}

.loading-indicator {
  color: #4299e1;
  width: 50;
  height: 50;
  margin-bottom: 16;
}

.loading-text {
  font-size: 16;
  color: #718096;
  font-family: system;
}

/* No Jobs Message */
.no-jobs-container {
  text-align: center;
  padding: 60 40;
  vertical-align: center;
}

.no-jobs-icon {
  font-size: 56;
  margin-bottom: 20;
}

.no-jobs-title {
  font-size: 20;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 12;
  font-family: system;
  text-align: center;
}

.no-jobs-subtitle {
  font-size: 16;
  color: #4a5568;
  text-align: center;
  font-family: system;
  margin-bottom: 24;
  line-height: 1.4;
}

/* Empty State Actions */
.empty-actions {
  margin-top: 20;
}

.empty-action-button {
  background-color: #4299e1;
  color: #ffffff;
  font-size: 16;
  font-weight: 600;
  padding: 12 24;
  border-radius: 8;
  text-align: center;
  margin-bottom: 16;
  font-family: system;
}

.empty-suggestion {
  font-size: 14;
  color: #718096;
  text-align: center;
  font-family: system;
  font-style: italic;
  padding: 0 20;
}

/* Jobs Container */
.jobs-container {
  padding: 16 20;
}

/* Job Card Styles */
.job-card {
  background-color: #ffffff;
  border-radius: 12;
  margin-bottom: 16;
  padding: 20;
  elevation: 2;
  android-elevation: 2;
  border: 1 solid #e2e8f0;
}

.job-title {
  font-size: 18;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 12;
  line-height: 1.3;
  font-family: system;
}

/* Labels */
.labels-container {
  margin-bottom: 12;
}

.job-label {
  font-size: 12;
  font-weight: 500;
  padding: 4 8;
  margin: 2 4 2 0;
  border-radius: 12;
  font-family: system;
  text-align: center;
}

.more-labels {
  background-color: #e2e8f0;
  color: #4a5568;
}

/* Job Description */
.job-description {
  font-size: 14;
  color: #4a5568;
  line-height: 1.4;
  margin-bottom: 16;
  font-family: system;
}

/* Action Button */
.job-actions {
  border-top: 1 solid #f1f5f9;
  padding-top: 12;
  margin-top: 12;
}

.view-job-button {
  font-size: 14;
  font-weight: 600;
  color: #4299e1;
  text-align: right;
  font-family: system;
}
</style>
