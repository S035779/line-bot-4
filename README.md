# line-bot-4

## 1. Initialize

```
$ npm init --yes
$ npm install --save express @line/bot-sdk dotenv
```

## 2. Push source

```console:.gitignore
$ cat .gitignore
npm-debug.log
node_modules
.env
.vscode
```

```
$ git init
$ git add .
$ git commit -m "First commit"
$ git remote add origin s035779.github.com:S035779/line-bot-4.git
$ git push -u origin master
```

## 3. Run ngrok.

```
$ ngrok http 3000
```

## 4. Run line-bot-4 app.

```
$ npm run web
```

## 5. Set webhook url

Webhook URL: https://a05f-61-25-23-68.ngrok.io/bot/webhook

```
{ destination: 'U********************************', events: [] }
```

## 6. Reply static message.

```
{
  destination: 'U********************************',
  events: [
    {
      type: 'message',
      message: { type: 'text', id: '17391207771927', text: 'こんにちは' },
      webhookEventId: '01GNM2EF14G4JZQEQ3VHRKC3Z5',
      deliveryContext: { isRedelivery: false },
      timestamp: 1672489679786,
      source: { type: 'user', userId: 'U********************************' },
      replyToken: '5f32339530cd46939db0bf81a75340ae',
      mode: 'active'
    }
  ]
}
1 event(s) processed.
```

eol
