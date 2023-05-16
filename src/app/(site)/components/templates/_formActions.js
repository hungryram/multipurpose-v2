'use server'

import { ServerClient } from 'postmark'
import { redirect } from 'next/navigation';

const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

export const submitForm = async (data) => {

  let formData = {}
  let email = '';
  const honeypot = data.get('name-honey')
  
  data.forEach((value, name) => {
    if (
        !name.includes('$ACTION_ID') &&
        name !== 'bcc' &&
        name !== 'cc' &&
        name !== 'name-honey'
    ){
      if (name === 'Email') {
        email = value;
      } else {
        if (formData[name]) {
          formData[name] = Array.isArray(formData[name])
            ? [...formData[name], value]
            : [formData[name], value];
        } else {
          formData[name] = value;
        }
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

    if (honeypot.length === 0) {

        const response = await client.sendEmail({
            "From": 'forms@hungryramwebdesign.com', // must match sender signature on postmark account
            "To": "ram@hungryram.com",
            "Bcc": data.get('bcc'),
            "Cc": data.get('cc'),
            "ReplyTo": email,
            "Subject": "Inquiry",
            "HtmlBody": htmlBody,
        })
        .then((res) => res)
        .catch((err) => console.error(err))

        if (response.Message == 'OK') {
            return redirect('/thank-you')
        }

    }
  
}
