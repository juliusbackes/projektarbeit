<script lang="ts">
    import { convertXLSXtoJSON } from '$lib/utils';

    let files: FileList = $state();

    const handleFile = async () => {
        const file = files[0];
        const data = await convertXLSXtoJSON(file);
        console.log(data);
    };
</script>
<button onclick={() => handleFile()}>Click me</button>

<input type="file" bind:files={files}>