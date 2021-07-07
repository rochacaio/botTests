const { WebClient } = require("@slack/web-api")
const { createEventAdapter } = require("@slack/events-api")

const slackSigningSecret = "e5ea5c2bd03b196fbd93b92100328225"
const slackToken = "xoxb-2232431608855-2253371999108-Z9wMZncugyxofMmR573I7WZv"
const port =  3000

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken)

slackEvents.on('app_mention',(event)=>{
    console.log(`mensagem de ${event.user}:${event.text}`);
    (async()=>{
        try{
            await slackClient.chat.postMessage({channel: event.channel,text:`Hello <@${event.user}>! :fire:`})
        } catch(error){
            console.log(error.data);
        }
    })();
});

slackEvents.on('error', console.error)

slackEvents.start(port).then(()=>{
    console.log(`servidor rodando na porta ${port}`)
})