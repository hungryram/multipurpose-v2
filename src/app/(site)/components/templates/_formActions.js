'use server'

import { ServerClient } from 'postmark'

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

export const submitForm = async (data) => {
    let formData = {}
    for( let [name] of data.entries()){
        if(!name.includes('$ACTION_ID')){
            formData[name] = data.get(name) 
        }
    }
    client.sendEmail({
              "From": '<from_email>', // must match sender signature on postmark account
              "To": "<to_email>",
              "Subject": "<subject>",
              "TextBody": JSON.stringify(formData),
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
  }