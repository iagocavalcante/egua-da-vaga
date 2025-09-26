<template>
  <ScrollView orientation="vertical" backgroundColor="#f7fafc">  
    <StackLayout class="container">
        <GridLayout class="repository-card"
          :key="index" v-for="(repository, index) in repositories"
          @tap="goTo(repository.name)"
          rows="auto, auto" columns="80, *"
        >
          <Image 
            row="0" rowSpan="2" col="0"
            stretch="aspectFill" 
            class="repository-avatar" 
            :src="repository.imageUrl" 
          />
          <StackLayout row="0" col="1" class="repository-info">
            <Label 
              class="repository-title"
              textWrap="true"
              :text="repository.title"
            />
            <Label 
              class="repository-description"
              textWrap="true"
              :text="repository.description"
            />
          </StackLayout>
          <StackLayout row="1" col="1" class="repository-stats" orientation="horizontal">
            <Label class="stat-item" text="🔍 Browse Jobs" />
          </StackLayout>
        </GridLayout>
    </StackLayout>
  </ScrollView>
</template>

<script>
import Jobs from './Jobs';

export default {
  name: 'RepositoryJob',
  data: () => ({
    repositories: [
      {
        title: 'FrontEnd Brasil',
        name: 'frontendbr',
        description: 'Comunidade brasileira de desenvolvedores front-end',
        imageUrl: 'https://avatars0.githubusercontent.com/u/16963863?s=400&v=4'
      },
      {
        title: 'Backend Brasil',
        name: 'backend-br',
        description: 'Vagas e discussões sobre desenvolvimento backend',
        imageUrl: 'https://avatars1.githubusercontent.com/u/30732658?s=400&v=4'
      },
      {
        title: 'Android Dev Brasil',
        name: 'androiddevbr',
        description: 'Comunidade de desenvolvedores Android do Brasil',
        imageUrl: 'https://avatars1.githubusercontent.com/u/13825651?s=400&v=4'
      },
      {
        title: 'CocoaHeads Brasil',
        name: 'CocoaHeadsBrasil',
        description: 'Desenvolvedores iOS e macOS do Brasil',
        imageUrl: 'https://avatars3.githubusercontent.com/u/7914270?s=400&v=4'
      },
      {
        title: 'PHP Brasil',
        name: 'phpdevbr',
        description: 'Comunidade brasileira de desenvolvedores PHP',
        imageUrl: 'https://avatars1.githubusercontent.com/u/21205969?s=400&v=4'
      },
      {
        title: 'Stone Pagamentos',
        name: 'stone-payments',
        description: 'Fintech brasileira com foco em tecnologia',
        imageUrl: 'https://avatars1.githubusercontent.com/u/8750624?s=400&v=4'
      },
      {
        title: 'Vue.js Brasil',
        name: 'vuejs-br',
        description: 'Comunidade brasileira do framework Vue.js',
        imageUrl: 'https://avatars3.githubusercontent.com/u/13300590?s=400&v=4'
      },
      {
        title: 'Go Community',
        name: 'Gommunity',
        description: 'Comunidade brasileira da linguagem Go',
        imageUrl: 'https://avatars3.githubusercontent.com/u/44899413?s=400&v=4'
      }
    ]
  }),
  methods: {
    goTo ( repositoryName ) {
      this.$navigateTo(Jobs, {
        animated: true,
        transition: {
          name: "fade",
          duration: 380,
          curve: "easeIn"
        },
        props: {
          repositoryName
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 16;
  background-color: #f7fafc;
}

.repository-card {
  background-color: #ffffff;
  border-radius: 12;
  margin-bottom: 16;
  padding: 16;
  elevation: 3;
  android-elevation: 3;
  border: 1 solid #e2e8f0;
}

.repository-avatar {
  width: 64;
  height: 64;
  border-radius: 32;
  margin-right: 16;
  border: 2 solid #e2e8f0;
}

.repository-info {
  padding-left: 16;
  vertical-align: top;
}

.repository-title {
  font-size: 18;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 4;
  font-family: system;
}

.repository-description {
  font-size: 14;
  color: #718096;
  margin-bottom: 8;
  font-family: system;
  line-height: 1.4;
}

.repository-stats {
  padding-left: 16;
  margin-top: 8;
}

.stat-item {
  font-size: 12;
  color: #4299e1;
  font-weight: 500;
  padding: 4 8;
  background-color: #ebf8ff;
  border-radius: 12;
  font-family: system;
}
</style>
