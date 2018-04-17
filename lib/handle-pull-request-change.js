module.exports = handlePullRequestChange;

async function handlePullRequestChange(context) {
  const { title, html_url: htmlUrl, head } = context.payload.pull_request;
  const hasId = matchesId(title);
  const status = hasId ? "success" : "failure";

  if (!context.payload.repository.private) {
    console.log(`Updating PR "${title}" (${htmlUrl}): ${status}`);
  }

  context.github.repos.createStatus(
    context.repo({
      sha: head.sha,
      state: status,
      target_url: "https://github.com/apps/id-bot",
      description: hasId
        ? "ready for review"
        : "does not have an ID - do not merge!",
      context: "ID"
    })
  );
}

function matchesId(string) {
  return /(^|\W)#\d+\W/i.test(string);
}
