<template>
	<Page androidStatusBarBackground="#1a202c">
		<ActionBar backgroundColor="#2d3748" class="action-bar">
			<GridLayout width="100%" columns="auto, *">
				<Label class="title" text="Égua da Vaga" col="1"/>
			</GridLayout>
		</ActionBar>

		<GridLayout ~mainContent columns="*" rows="*" backgroundColor="#f7fafc">
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
    .action-bar {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        elevation: 4;
        android-elevation: 4;
    }
		
		StackLayout {
			margin-bottom: 10;
			flex: 1;
		}

    .title {
			font-size: 22;
			font-weight: bold;
			color: #ffffff;
			text-align: left;
			padding-left: 20;
			font-family: system;
    }

    .message {
			vertical-align: center;
			text-align: center;
			font-size: 18;
			color: #4a5568;
			font-family: system;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
        color: #ffffff;
        font-size: 24;
        font-weight: bold;
    }

    .drawer-item {
        padding: 12 16;
        color: #4a5568;
        font-size: 16;
        border-bottom: 1 solid #e2e8f0;
		}

		.card {
			background-color: #ffffff;
			padding: 16;
			margin: 8 16 16 16;
			border-radius: 12;
			elevation: 2;
			android-elevation: 2;
		}
</style>
