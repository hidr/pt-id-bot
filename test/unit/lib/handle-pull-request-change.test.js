const handlePullRequestChange = require("../../../lib/handle-pull-request-change");

describe("handlePullRequestChange", () => {
  const createMockContext = prTitle => {
    return {
      repo: jest.fn(),
      payload: {
        pull_request: {
          head: { sha: "sha" },
          title: prTitle
        },
        repository: {
          private: true
        }
      },
      github: {
        repos: {
          createStatus: jest.fn()
        },
        pullRequests: {
          getCommits: jest.fn().mockReturnValue({ data: [] })
        },
        issues: {
          getIssueLabels: jest.fn().mockReturnValue({ data: [] })
        }
      }
    };
  };

  const createMockCommitContext = commitMessage => {
    const context = createMockContext("Example PR title");

    context.github.pullRequests.getCommits = jest.fn().mockReturnValue({
      data: [{ commit: { message: commitMessage } }]
    });

    return context;
  };

  const createMockLabelContext = labelName => {
    const context = createMockContext("Example PR title");

    context.github.issues.getIssueLabels = jest.fn().mockReturnValue({
      data: [{ name: labelName }]
    });

    return context;
  };

  const failureStatusObject = {
    context: "ID",
    description: "does not have an ID - do not merge!",
    sha: "sha",
    state: "failure",
    target_url: "https://github.com/apps/id-bot"
  };

  const successStatusObject = {
    context: "ID",
    description: "ready for review",
    sha: "sha",
    state: "success",
    target_url: "https://github.com/apps/id-bot"
  };

  it("creates failure status if PR title does not contain ID", async () => {
    const context = createMockContext("foo bar commit message");
    await handlePullRequestChange(context);

    expect(context.repo).lastCalledWith(failureStatusObject);
  });

  it("creates success status if PR title contains ID", async () => {
    const context = createMockContext("#123: foo bar commit message");
    await handlePullRequestChange(context);

    expect(context.repo).lastCalledWith(successStatusObject);
  });

  it("creates success status if PR title contains ID surrounded by braces", async () => {
    const context = createMockContext("[#123] foo bar commit message");
    await handlePullRequestChange(context);

    expect(context.repo).lastCalledWith(successStatusObject);
  });

  it("creates success status if PR title contains ID surrounded by braces and spaces", async () => {
    const context = createMockContext("[ #123 ] foo bar commit message");
    await handlePullRequestChange(context);

    expect(context.repo).lastCalledWith(successStatusObject);
  });

  it("creates success status if PR title contains multiple IDs surrounded by braces", async () => {
    const context = createMockContext("[#123, #456] foo bar commit message");
    await handlePullRequestChange(context);

    expect(context.repo).lastCalledWith(successStatusObject);
  });
});
