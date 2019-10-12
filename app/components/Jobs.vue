<template>
  <Page androidStatusBarBackground="#e6197f">
    <ActionBar backgroundColor="#F80577" flat="true">
      <StackLayout orientation="vertical" width="100%" height="100%"
        backgroundColor="#F80577"
      >
        <StackLayout backgroundColor="#F80577">
          <StackLayout 
              orientation="horizontal"
              marginTop="5">
            <TextField backgroundColor="white" paddingLeft="20"
              borderRadius="20" v-model="search" width="80%"
              hint="Procurar vaga"
              height="40" fontSize="14"></TextField>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ActionBar>
    <ActivityIndicator v-if="$apollo.loading" busy="true"/>
    <ScrollView orientation="vertical" v-else>
      <FlexboxLayout flexDirection="column">
        <FlexboxLayout class="box" flexDirection="row" flexWrap="wrap" v-for="(item, index) in repository.issues.edges" :key="index">
          <Label class="" textWrap="true" :text="item.node.title" />
          <Label class="label" :text="label.node.name" :backgroundColor="`#${label.node.color}`" :key="i" v-for="(label, i) in item.node.labels.edges" />
          <ScrollView orientation="horizontal">
            <HtmlView :html="item.node.bodyHTML"/>
          </ScrollView>
        </FlexboxLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  props: ['repositoryName'],
  data() {
    return {
      repository: {},
      search: '',
    }
  },
  mounted () {
    console.log(this.repository)
  },
  apollo: {
    repository: {
      query: gql`
        query repositoryListJobs ($repositoryName: String!) {
          repository(owner: $repositoryName, name:"vagas") {
            issues(last:20, states:OPEN) {
              edges {
                node {
                  title
                  url
                  bodyHTML
                  labels(first:10) {
                    edges {
                      node {
                        name,
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
      }
    },
    repositorySearch: {
      query: gql`
        query repositoryListJobs ($search: String!) {
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
                        name,
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
          search: `${this.repositoryName}/vagas is:issue is:open ${this.search}`
        }
      }
    },
  },
}
</script>

<style scoped>
  ActionBar {
    background-color: transparent;
  }

 .label {
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 20px;
    padding: 15px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 14;
    color: #fefefe;
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.14);
    text-align: center;
  }

  .box {
    padding: 20;
    margin: 15;
    box-shadow: 5px 10px #fefefe;
  }

  .title {
    margin: 20; 
  }

  #searchRow {
    margin-top: 20;
  }
</style>
