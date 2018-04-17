# id-bot

> Require a bug ID in a PR as a service

## Usage

1.  Install the app on your GitHub Repositories: [github.com/apps/wip](https://github.com/apps/wip)
2.  The ID bot sets status of the request title to failed if it does not find an id (# followed by numbers) in the title

## Local setup

* Setup repository

  ```
  git clone git@github.com:hidr/id-bot.git
  cd wip-bot
  npm install
  ```

* Create your own GitHub app: [instructions](https://probot.github.io/docs/development/#configure-a-github-app)
* On your local machine, copy `.env.example` to `.env`.
* Go to [smee.io](https://smee.io) and click **Start a new channel**. Set `WEBHOOK_PROXY_URL` in `.env` to the URL that you are redirected to.
* [Create a new GitHub App](https://github.com/settings/apps/new) with:
  * **Webhook URL**: Use your `WEBHOOK_PROXY_URL` from the previous step.
  * **Webhook Secret**: `development`.
  * **Permissions & events**
    * Commit statuses **(read & write)**
    * Pull Requests **(read only)**
    * Subscribe to events **Pull request**
* Download the private key and move it to your project's directory. It will get picked up by Probot automatically.
* Edit `.env` and set `APP_ID` to the ID of the app you just created. The App ID can be found in your app settings page here
* Run `$ npm start` to start the server/

## Contribute

If you’d like to contribute a bug fix or feature to `wip-bot`, please fork the repository, then clone it to your computer. Then install dependencies and run the tests

```
npm install
npm test
```

Before adding a feature, create an issue first to ask if it’s within the scope of the app. If possible, add tests to your pull requests.

## License

[Apache 2.0](LICENSE)
