'use server'
import { ServerClient } from 'postmark'
import { redirect } from 'next/navigation';

export const submitForm = async (data) => {

    let formData = {}
    let email = '';
    const honeypot = data.get('name-honey')

    data.forEach((value, name) => {
        if (
          !name.includes('$ACTION_ID') &&
          name !== 'bcc' &&
          name !== 'cc' &&
          name !== 'name-honey' &&
          name !== 'sendTo' &&
          name !== 'sendFrom' &&
          name !== 'subject' &&
          name !== 'redirectTo'
        ) {
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
      
            // Check if the field is a file input
            const field = data.get(name);
            if (field instanceof FileList) {
              const files = Array.from(field);
              files.forEach((file) => {
                
                // Read the file data and convert it to Base64 encoding
                const fileData = fs.readFileSync(file.path);
                const base64FileData = fileData.toString('base64');
      
                // Add the file as an attachment to the Postmark email
                const fileAttachment = {
                  Name: file.name,
                  Content: base64FileData,
                  ContentType: file.type,
                };
      
                // Add the attachment to the formData
                if (formData[name].attachments) {
                  formData[name].attachments.push(fileAttachment);
                } else {
                  formData[name].attachments = [fileAttachment];
                }
              });
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
    <h2>Contact Form Submission</h2>
    <table>
      <tbody>
        ${tableRows.join('')}
        <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
        </tr>
      </tbody>
    </table>
  `;

    if (honeypot.length === 0) {
        if (process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN) {
            const client = new ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN);

            const response = await client.sendEmail({
                "From": data.get('sendFrom'), // must match sender signature on postmark account
                "To": data.get('sendTo'),
                "Bcc": data.get('bcc'),
                "Cc": data.get('cc'),
                "ReplyTo": email,
                "Subject": data.get('subject'),
                "HtmlBody": htmlBody,
                "Attachments": [fileAttachment],
            })
                .then((res) => res)
                .catch((err) => console.error(err))

            if (response?.Message === 'OK') {
                return redirect(`${data.get('redirectTo')}`)
            }
        } else {
            console.error("Postmark API token is missing.");
        }
    }
}
