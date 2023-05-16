'use server'

import { ServerClient } from 'postmark'

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

export const submitForm = async (data) => {
  let formData = {}
  data.forEach((value, name) => {
    if (!name.includes('$ACTION_ID')) {
      if (formData[name]) {
        formData[name] = Array.isArray(formData[name])
          ? [...formData[name], value]
          : [formData[name], value];
      } else {
        formData[name] = value;
      }
    }
  });
  
  const tableRows = Object.entries(formData).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value.join(', ')}</td>
        </tr>
      `;
    } else {
      return `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value}</td>
        </tr>
      `;
    }
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
