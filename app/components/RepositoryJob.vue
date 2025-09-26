<template>
  <ScrollView orientation="vertical">  
    <StackLayout>
        <StackLayout class="box"
          :key="index" v-for="(repository, index) in repositories"
          @tap="goTo(repository.name)"
        >
          <Image stretch="aspectFill" class="album-image" :src="repository.imageUrl" />
          <FlexboxLayout class="border-card-text" flexDirection="column" backgroundColor="#F80577" marginTop="15">
            <Label textWrapt="true" alignSelf="center" fontSize="26" class="font-weight-bold"  
                color="#fefefe" :text="repository.title"></Label>
          </FlexboxLayout>
        </StackLayout>
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
        title: 'FrontEnd Br',
        name: 'frontendbr',
        imageUrl: 'https://avatars0.githubusercontent.com/u/16963863?s=400&v=4'
      },
      {
        title: 'Backend Br',
        name: 'backend-br',
        imageUrl: 'https://avatars1.githubusercontent.com/u/30732658?s=400&v=4'
      },
      {
        title: 'Android Dev Br',
        name: 'androiddevbr',
        imageUrl: 'https://avatars1.githubusercontent.com/u/13825651?s=400&v=4'
      },
      {
        title: 'Cocoa Heads',
        name: 'CocoaHeadsBrasil',
        imageUrl: 'https://avatars3.githubusercontent.com/u/7914270?s=400&v=4'
      },
      {
        title: 'PHP Brasil',
        name: 'phpdevbr',
        imageUrl: 'https://avatars1.githubusercontent.com/u/21205969?s=400&v=4'
      },
      {
        title: 'Stone Pagamentos',
        name: 'stone-payments',
        imageUrl: 'https://avatars1.githubusercontent.com/u/8750624?s=400&v=4'
      },
      {
        title: 'Vue JS Br',
        name: 'vuejs-br',
        imageUrl: 'https://avatars3.githubusercontent.com/u/13300590?s=400&v=4'
      },
      {
        title: 'Go Community',
        name: 'Gommunity',
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
.album-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.border-card-text {
  border-radius: 10;
  width: 80%;
}
</style>
