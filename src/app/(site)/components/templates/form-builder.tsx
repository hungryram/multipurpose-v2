import React from 'react';
import { submitForm } from './_formActions'

interface FormField {
  name: string;
  label: string;
  type: any;
  _key: string;
  radioValue: string[]
  selectValue: string[]
  checkBoxValue: string[]
  required: boolean
}

interface FormSchema {
  subject: string;
  fields: FormField[];
  emailCc: string;
  emailBcc: string;
  sendTo: string;
  sendFrom: string;
  redirectTo: string;
  buttonLabel: string;
  buttonBackgroundColor: any;
  buttonTextColor: any;
}

interface FormBuilderProps {
  formSchema: FormSchema;
}

export default function FormBuilder({ formSchema }: FormBuilderProps) {
  return (
    <div className="py-10 px-4">
      <form action={submitForm}>
        <label className="hidden" htmlFor="name-honey" />
        <input className="hidden" type="text" name="name-honey" />
        <input className="hidden" type="hidden" name="bcc" value={formSchema?.emailBcc} />
        <input className="hidden" type="hidden" name="cc" value={formSchema?.emailCc} />
        <input className="hidden" type="hidden" name="sendFrom" value={formSchema?.sendFrom ? formSchema.sendFrom : 'forms@hungryramwebdesign.com'} />
        <input className="hidden" type="hidden" name="sendTo" value={formSchema?.sendTo} />
        <input className="hidden" type="hidden" name="subject" value={formSchema?.subject} />
        <input className="hidden" type="hidden" name="redirectTo" value={formSchema?.redirectTo} />
        {formSchema?.fields && (
          <>
            {formSchema.fields.map((field) => {
              return (
                <div key={field._key} className="mb-4">
                  <label htmlFor={field.label.replace(/ /g, '')} className="block text-sm font-medium leading-6">
                    {field.label}
                    {field.required && <span>*</span>}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type="text"
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      id={field.label.replace(/ /g, '')}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'email' && (
                    <input
                      type="email"
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      id={field.label.replace(/ /g, '')}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'radio' && (
                    <div className="flex items-center gap-x-3 mt-4">
                      {field?.radioValue?.map((node) => {
                        return (
                          <>
                            <input
                              type="radio"
                              name={field.label}
                              id={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '')}
                              className="h-4 w-4 rounded border-gray-300"
                              required={field.required ? true : undefined}
                            />
                            <label htmlFor={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '')} className="block text-sm font-medium leading-6 text-gray-900">
                              {node}
                            </label>
                          </>
                        )
                      })}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className="flex items-center gap-x-3 mt-4">
                      {field?.checkBoxValue?.map((node) => {
                        return (
                          <>
                            <input
                              type="checkbox"
                              name={field.label}
                              id={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '')}
                              className="h-4 w-4 rounded border-gray-300"
                              value={node}
                              required={field.required ? true : undefined}
                            />
                            <label htmlFor={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '')} className="block text-sm font-medium leading-6 text-gray-900">
                              {node}
                            </label>
                          </>
                        )
                      })}
                    </div>
                  )}
                  {field.type === 'select' && (
                    <div className="flex items-center gap-x-3 mt-4">
                      <select
                        id={field.label.replace(/ /g, '')}
                        name={field.label}
                        className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6"
                        required={field.required ? true : undefined}
                      >
                        {field?.selectValue?.map((node, i) => {
                          return (
                            <option value={node} key={i}>
                              {node}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      name={field.label}
                      className="border rounded-sm px-3 py-2 w-full"
                      rows={3}
                      id={field.label.replace(/ /g, '')}
                      required={field.required ? true : undefined}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
        <button type="submit" className="primary-button" style={{
          backgroundColor: formSchema?.buttonBackgroundColor?.hex,
          color: formSchema?.buttonTextColor?.hex
        }}>
          {formSchema?.buttonLabel ?? 'Submit'}
        </button>
      </form>
    </div>
  );
}
