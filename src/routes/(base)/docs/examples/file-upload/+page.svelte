<script lang="ts">
  import FileUpload from '$lib/components/file-upload/FileUpload.svelte'
  import FileUploadButton from '$lib/components/file-upload/FileUploadButton.svelte'
  import FileUploadDropZone from '$lib/components/file-upload/FileUploadDropZone.svelte'
  import FileUploadLabel from '$lib/components/file-upload/FileUploadLabel.svelte'
  import FileUploadList from '$lib/components/file-upload/FileUploadList.svelte'
  import FileUploadListItem from '$lib/components/file-upload/FileUploadListItem.svelte'
  let value1: FileList
  let value2: FileList
  let value3: FileList
  function handleChange(e: any) {
    console.log(e.target.value, e.target.files)
  }
</script>

<h1>#1 Selected Files: {value1?.length}</h1>
<FileUpload bind:value={value1}>
  <FileUploadLabel>File</FileUploadLabel>
  <FileUploadButton>Select Files</FileUploadButton>
  <FileUploadDropZone class="border border-blue-300 w-32 h-32" />
  <FileUploadList let:files>
    {#each files as file}
      <FileUploadListItem {file} let:remove
        ><span>{file.name}</span>
        <button on:click={() => remove(file)}>X</button></FileUploadListItem
      >
    {/each}
  </FileUploadList>
</FileUpload>

<h1>#2 Selected Files: {value2?.length}</h1>
<FileUpload bind:value={value2} multiple={true}>
  <FileUploadLabel>File</FileUploadLabel>
  <FileUploadButton>Select Files</FileUploadButton>
  <FileUploadDropZone class="border border-blue-300 w-32 h-32" />
  <FileUploadList let:files>
    {#each files as file}
      <FileUploadListItem {file} let:remove
        ><span>{file.name}</span>
        <button on:click={() => remove(file)}>X</button></FileUploadListItem
      >
    {/each}
  </FileUploadList>
</FileUpload>

<h1>#3 Dispathc wright:{value3?.length}</h1>
<FileUpload bind:value={value3} multiple={true} on:change={handleChange}>
  <FileUploadLabel>File</FileUploadLabel>
  <FileUploadButton>Select Files</FileUploadButton>
  <FileUploadDropZone class="border border-blue-300 w-32 h-32" />
  <FileUploadList let:files>
    {#each files as file}
      <FileUploadListItem {file} let:remove
        ><span>{file.name}</span>
        <button on:click={() => remove(file)}>X</button></FileUploadListItem
      >
    {/each}
  </FileUploadList>
</FileUpload>
