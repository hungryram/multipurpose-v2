'use server'

import { ServerClient } from 'postmark'

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

export const submitForm = async (data) => {
  let formData = {}
  for (let [name] of data.entries()) {
    if (!name.includes('$ACTION_ID')) {
      formData[name] = data.get(name)
    }
  }
  
  const tableRows = Object.entries(formData).map(([key, value]) => {
    return `
      <tr>
        <td>${key}</td>
        <td>${value}</td>
      </tr>
    `;
  });

  const htmlBody = `
    <h1>Contact Form Submission</h1>
    <table>
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;
  
  client.sendEmail({
    "From": 'forms@hungryramwebdesign.com', // must match sender signature on postmark account
    "To": "ram@hungryram.com",
    "Subject": "Inquiry",
    "HtmlBody": htmlBody,
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
}
