'use client'
import { useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  company_name: string
  logo: string;
  navItems: any;
  logoWidth: number;
  phone: string;
  email: string
}

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example({
  company_name,
  logo,
  navItems,
  logoWidth,
  phone,
  email
}: Props) {



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="inset-x-0 top-0 z-50">
      <div className="bg-gray-900">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Currency selector */}
          <div>
            test
          </div>

          <div className="flex items-center space-x-6">
            {email && <a href={`mailto:${email}`} className="text-sm font-medium text-white hover:text-gray-100">{email}</a>}
            {phone && <a href={`tel:${phone}`} className="text-sm font-medium text-white hover:text-gray-100">{phone}</a>}
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="relative cursor-pointer inline-block">
            {logo ?
              <img
                src={logo}
                width={logoWidth ? logoWidth : '150'}
                height={10}
                alt={company_name}
              />
              :
              <h1 className="text-3xl">{company_name}</h1>
            }
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((link: any) => {
            const menuLinks =
              (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
              (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
              (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
              (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
              (link.externalUrl && `${link.externalUrl}`)

            if (link?.subMenu?.length > 0) {
              return (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group rounded-md inline-flex items-center outline-none'
                        )}
                      >
                        <span className="text-sm font-semibold leading-6 text-gray-900">Resources</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600' : 'text-gray-900',
                            'ml-2 h-4 w-4 group-hover:text-gray-500'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-50 -ml-4 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-sm shadow-lg overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                              {link.subMenu.map((sub: any) => {

                                const subMenuLinks =
                                  (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) ||
                                  (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) ||
                                  (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) ||
                                  (sub.internalLink?._type === "services" && `/services/${sub.internalLink.slug}`) ||
                                  (sub.internalLink?._type === "locations" && `/locations${sub.internalLink.slug}`) ||
                                  (sub.externalUrl && `${sub.externalUrl}`)

                                return (
                                  <>
                                    <Link
                                      key={sub._id}
                                      href={subMenuLinks ?? '/'}
                                      target={sub.newTab && '_blank'}
                                      className="py-1 block"
                                    >
                                      {sub.text}
                                    </Link>
                                  </>
                                )
                              })}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              )
            } else {
              return (
                <Link
                  key={link.name}
                  href={menuLinks}
                  className="text-sm font-semibold leading-6 text-gray-900">
                  {link.text}
                </Link>
              )
            }
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative cursor-pointer inline-block">
              {logo ?
                <img
                  src={logo}
                  width={logoWidth ? logoWidth : '150'}
                  height={10}
                  alt={company_name}
                />
                :
                <h1 className="text-3xl">{company_name}</h1>
              }
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((link: any) => {
                  const menuLinks =
                    (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
                    (link.externalUrl && `${link.externalUrl}`)

                  if (link?.subMenu?.length > 0) {
                    return (
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={classNames(
                                open ? 'text-gray-900' : 'text-gray-500',
                                'group rounded-md inline-flex items-center outline-none'
                              )}
                            >
                              <span className="text-sm font-semibold leading-6 text-gray-900">Resources</span>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? 'text-gray-600' : 'text-gray-900',
                                  'ml-2 h-4 w-4 group-hover:text-gray-500'
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="z-50 -ml-4 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                <div className="overflow-hidden">
                                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    {link.subMenu.map((sub: any) => {

                                      const subMenuLinks =
                                        (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "services" && `/services/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "locations" && `/locations${sub.internalLink.slug}`) ||
                                        (sub.externalUrl && `${sub.externalUrl}`)

                                      return (
                                        <>
                                          <Link
                                            key={sub._id}
                                            href={subMenuLinks ?? '/'}
                                            target={sub.newTab && '_blank'}
                                            className="py-1 block"
                                          >
                                            {sub.text}
                                          </Link>
                                        </>
                                      )
                                    })}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    )
                  } else {
                    return (
                      <Link
                        key={link.name}
                        href={menuLinks}
                        className="text-sm font-semibold leading-6 text-gray-900">
                        {link.text}
                      </Link>
                    )
                  }
                })}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
