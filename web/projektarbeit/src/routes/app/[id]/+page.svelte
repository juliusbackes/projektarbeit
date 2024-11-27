<script lang="ts">
import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    console.log(data);

</script>

<div>
    {data.project?.name}
</div>
