<template>
  <Page>
    <ActionBar backgroundColor="#44557f" flat="true">
      <StackLayout orientation="vertical" width="100%" height="100%"
        backgroundColor="#44557f"
      >
        <StackLayout backgroundColor="#44557f">
          <StackLayout #searchRow orientation="horizontal"
              marginTop="5">
            <TextField backgroundColor="white" paddingLeft="20"
              borderRadius="20" v-model="search" width="80%"
              height="40" fontSize="14" hint="Search"></TextField>
            <Image src="https://img.icons8.com/cotton/2x/search--v2.png" height="30"
              width="30" marginLeft="10"></Image>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ActionBar>
    <ActivityIndicator v-if="$apollo.loading" busy="true"/>
    <ScrollView orientation="vertical" v-else>
      <FlexboxLayout flexDirection="column">
        <FlexboxLayout class="box" flexDirection="row" flexWrap="wrap" v-for="(item, index) in repository.issues.edges" :key="index">
          <Label class="" textWrap="true" height="70" :text="item.node.title" />
          <Label class="label" height="20" :text="label.node.name" :backgroundColor="`#${label.node.color}`" :key="i" v-for="(label, i) in item.node.labels.edges" />
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
    color: #1d1b1b;
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.14);
    text-align: center;
  }

  .box {
    padding: 20;
    margin: 15;
    box-shadow: 5px 10px #646464;
  }

  .title {
    margin: 20; 
  }

  #searchRow {
    margin-top: 20;
  }
</style>
