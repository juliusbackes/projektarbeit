<script lang="ts">
    import Toast from './Toast.svelte'


const toast = {
    id: crypto.randomUUID(),
    type: "success",
    message: 'Test',
}

</script>

<div class="absolution top-2 right-2 flex flex-col gap-2">
    <Toast {toast} />
</div>