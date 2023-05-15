import React from 'react';
import { submitForm } from './_formActions'

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

  return (
    <div className="py-10 px-4">
      <h2>{formSchema?.title}</h2>
      <form action={submitForm}>
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
