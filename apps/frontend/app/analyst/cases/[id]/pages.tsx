<button
  onClick={async () => {
    const res = await apiPost(`/analyst/cases/${params.id}/report`);
    alert("Report generated!");
    console.log(res.content);
  }}
  className="px-4 py-2 bg-purple-600 text-white rounded shadow"
>
  Generate Report
</button>
