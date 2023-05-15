import React from 'react';
import { ServerClient } from 'postmark';

interface FormField {
  name: string;
  label: string;
  type: any;
}

interface FormSchema {
  title: string;
  fields: FormField[];
}

interface FormBuilderProps {
  formSchema: FormSchema;
}

export default function FormBuilder({ formSchema }: FormBuilderProps) {
  const serverToken: string = process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN || '';
  const client = new ServerClient(serverToken);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Submit the form data to your backend or perform other actions
    try {
      // Send the form data to your backend API
      const response = client.sendEmail({}) //PLEASE ADD YOUR EMAIL CODE HERE


      if (response.ok) {
        // Form submission successful
        console.log('Form submitted successfully');
        // Perform any additional actions or show success message
      } else {
        // Form submission failed
        console.error('Form submission failed');
        // Perform error handling or show error message
      }
    } catch (error) {
      console.error('An error occurred while submitting the form', error);
      // Perform error handling or show error message
    }
  };

  return (
    <div className="py-10 px-4">
      <h2>{formSchema?.title}</h2>
      <form onSubmit={onSubmit}>
        {formSchema?.fields && (
          <>
            {formSchema.fields.map((field) => {
              return (
                <div key={field._id} className="mb-4">
                  <label
                    htmlFor={field.label.replace(/ /g, '')}
                    className="block text-sm font-medium leading-6"
                  >
                    {field.label}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      id={field.label.replace(/ /g, '')}
                    />
                  )}
                  {field.type === 'email' && (
                    <input
                      type="email"
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      id={field.label.replace(/ /g, '')}
                    />
                  )}
                  {field.type === 'checkbox' && (
                    <input
                      type="checkbox"
                      name={field.label}
                      id={field.label.replace(/ /g, '')}
                    />
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      rows={3}
                      id={field.label.replace(/ /g, '')}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
        <button type="submit" className="primary-button">
          Save
        </button>
      </form>
    </div>
  );
}
