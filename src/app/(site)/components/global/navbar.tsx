'use client'
import { useState } from 'react'
import { Dialog, Popover, Transition, Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import Styles from "./navbar.module.css"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  company_name: string
  logo: string;
  navItems: any;
  logoWidth: number;
  phone: string;
  email: string;
  office: string;
  backgroundColor: string;
  enableTopHeader: boolean;
  ctaLink: any;
  ctaText: string
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
  email,
  office,
  backgroundColor,
  enableTopHeader,
  ctaLink,
  ctaText
}: Props) {



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const ctaLinking =
    (ctaLink?.internalLink?._type === "pages" && `/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "blog" && `/blog/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "legal" && `/legal/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "services" && `/services/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.externalUrl && `${ctaLink?.externalUrl}`)

  return (
    <>
      <header className={`${Styles.header} hidden lg:block`}>
        {enableTopHeader &&
          <div className={Styles.topHeader}>
            <div className={Styles.topHeaderContainer}>
              <div />
              <div className="flex items-center space-x-6 text-white">
                {email && <a href={`mailto:${email}`} className="text-sm">{email}</a>}
                {phone && <a href={`tel:${phone}`} className="text-sm">Direct: {phone}</a>}
                {office && <a href={`tel:${office}`} className="text-sm">Office: {office}</a>}
              </div>
            </div>
          </div>
        }
        <nav className={Styles.navWrapper} aria-label="Global">
          <div className={Styles.desktopLogoContainer}>
            <Link href="/">
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
          <div className={Styles.toggleMenu}>
            <button
              type="button"
              className={Styles.toggleMenuButton}
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className={Styles.desktopMenuContainer}>
            {navItems.map((link: any) => {

              const menuLinks =
                (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
                (link.externalUrl && `${link.externalUrl}`)

              if (link?.subMenu?.length > 0) {
                return (
                  <Popover className="relative" key={link._key}>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`group rounded-md inline-flex items-center outline-none ${Styles.navLinks}`}
                        >
                          {link?.text}
                          <ChevronDownIcon
                            className={`ml-2 h-4 w-4`}
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
                          <Popover.Panel className={Styles.desktopPopOverPanel}>
                            <div className="rounded-sm shadow-lg overflow-hidden">
                              <div className={Styles.desktopDropDown}>
                                {link.subMenu.map((sub: any) => {

                                  const subMenuLinks =
                                    (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "services" && `/services/${sub.internalLink.slug}`) ||
                                    (sub.externalUrl && `${sub.externalUrl}`)

                                  return (
                                    <>
                                      <Link
                                        key={sub._id}
                                        href={subMenuLinks ?? '/'}
                                        target={sub.newTab && '_blank'}
                                        className={`${Styles.navLinks} text-black py-2`}
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
                    key={link._id}
                    href={menuLinks}
                    className={Styles.navLinks}>
                    {link.text}
                  </Link>
                )
              }
            })}
          </div>
          {ctaLinking &&
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link href={ctaLinking ?? '/'} className="primary-button">
                {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          }
        </nav>
      </header>



      {/* MOBILE */}

      <Disclosure as="nav" className={Styles.mobileHeaderMenu}>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
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
                </div>
                <div className="-mr-2 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className={Styles.mobileDisclosureButton}>
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2 px-4">
                {navItems.map((link: any) => {
                  const menuLinks =
                    (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
                    (link.externalUrl && `${link.externalUrl}`)

                  if (link?.subMenu?.length > 0) {
                    return (
                      <Popover className="relative" key={link._key}>
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={'group rounded-md inline-flex items-center outline-non'}
                            >
                              <span className={Styles.navLinks}>{link?.text}</span>
                              <ChevronDownIcon
                                className={`ml-2 h-4 w-4`}
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
                              <Popover.Panel className="z-50 -ml-4 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                <div className="overflow-hidden">
                                  <div className="relative grid lg:bg-white px-5 py-3">
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
                                            className={Styles.navLinks}
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
                        className={Styles.navLinks}>
                        {link.text}
                      </Link>
                    )
                  }
                })}
              </div>
              <div className={Styles.mobileDropDownContact}>
                {ctaLinking &&
                  <div className="mb-6">
                    <Link href={ctaLinking ?? '/'} className="primary-button block text-center mx-4">
                      {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                }
                <div className="px-4">
                  <div className="items-center space-y-3 opacity-80 grid grid-cols-1">
                    {email && <a href={`mailto:${email}`} className="text-sm"><span className="font-semibold">Email:</span> {email}</a>}
                    {phone && <a href={`tel:${phone}`} className="text-sm"><span className="font-semibold">Direct:</span> {phone}</a>}
                    {office && <a href={`tel:${office}`} className="text-sm"><span className="font-semibold">Office:</span> {office}</a>}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
