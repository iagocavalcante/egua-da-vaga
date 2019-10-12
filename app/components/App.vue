<template>
	<Page androidStatusBarBackground="#e6197f">
		<ActionBar backgroundColor="#F80577">
			<GridLayout width="100%" columns="auto, *">
				<Label class="title" text="Égua da Vaga!"  col="1"/>
			</GridLayout>
		</ActionBar>

		<GridLayout ~mainContent columns="*" rows="*">
			<RepositoryJob />
		</GridLayout>
	</Page>
</template>

<script >
	import RepositoryJob from './RepositoryJob';

	export default {
		components: {
			RepositoryJob
		}
  }
</script>

<style scoped>
    ActionBar {
        background-color: #ffffff;
        color: #000000;
		}
		
		StackLayout {
			margin-bottom: 10px;
			flex: 1;
		}

    .title {
			font-size: 20;
			color: #fefefe;
			text-align: left;
			padding-left: 16;
    }

    .message {
			vertical-align: center;
			text-align: center;
			font-size: 20;
			color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
		}

		.card {
			background-color: beige;
			padding: 8px;
			margin-bottom: 20px;
		}
</style>
