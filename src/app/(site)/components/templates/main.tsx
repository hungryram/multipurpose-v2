import Hero from "./hero";
import CallToActionBanner from "./cta-banner";
import CalltoActionFullWidth from "./cta-fullwidthimage";
import CalltoActionLeftText from "./cta-lefttext";
import CalltoActionTextImage from "./cta-textimage";
import FeatureSection from "./feature-section";
import LogoCloudSection from "./logo-cloud-section";
import PricingSection from "./pricing-section";
import TestimonialSection from "./testimonials-section";
import ContactPage from "./contact-page";
import ContentSimple from "./content-simple";
import ServiceGrid from "./services-grid";
import TeamComponent from "./team-section";
import BlogSection from "./blog-section";

interface Props {
    pageBuilder: any[];
    allTestimonials: any[];
    allServices: any[];
    allTeam: any[];
    allBlog: any[];
    // CONTACT
    email: string;
    phone_number: string;
    office_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    emailAlerts: string;
    sendFrom: string;
    emailBcc: string;
    emailCc: string;
}

export default function Main({
    pageBuilder,
    allTestimonials,
    allServices,
    allTeam,
    allBlog,
    // CONTACT
    email,
    phone_number,
    office_number,
    address,
    city,
    state,
    zip_code,
    emailAlerts,
    sendFrom,
    emailBcc,
    emailCc,
}: Props) {
    return (
        <>
            {pageBuilder?.map((section: any) => {
                const bg = section?.background?.background;

                const backgroundStyles = {
                    backgroundColor:
                        bg?.backgroundType === 'color' && bg?.color?.hex,
                    backgroundImage:
                        bg?.backgroundType === 'image' &&
                        `linear-gradient(rgba(
                            ${bg?.imageOverlayColor?.rgb.r ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.g ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.b ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.a ?? '0.2'}
                            ),
                            rgba(
                            ${bg?.imageOverlayColor?.rgb.r ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.g ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.b ?? '0'},
                            ${bg?.imageOverlayColor?.rgb.a ?? '0.2'}
                            )),
                            url(${section?.backgroundImage?.image?.asset?.url})`,
                };

                if (section._type === 'hero') {
                    return (
                        <Hero
                            key={section?._key}
                            content={section?.content}
                            image={section?.image}
                            altText={section?.imageData?.asset?.altText}
                            blurData={section?.imageData?.asset?.blurData}
                        />
                    );
                }

                if (section._type === 'contentField') {
                    return (
                        <ContentSimple
                            key={section?._key}
                            content={section?.content}
                            layoutType={section?.layoutType}
                            heading={section?.heading}
                        />
                    );
                }

                if (section._type === 'ctaSection') {
                    return (
                        <>
                            {section.layoutType === 'banner' &&
                                <CallToActionBanner
                                    key={section?._key}
                                    content={section?.content}
                                />
                            }
                            {section.layoutType === 'textAndImage' &&
                                <CalltoActionTextImage
                                    key={section?._key}
                                    image={section?.imageData?.asset?.url}
                                    content={section?.content}
                                    reverseColumn={section?.reverseColumn}
                                    altText={section?.imageData?.asset?.altText}
                                    blurData={section?.imageData?.asset?.blurData}
                                />
                            }
                            {section.layoutType === 'fullWidthTextImage' &&
                                <CalltoActionFullWidth
                                    key={section?._key}
                                    image={section?.imageData?.asset?.url}
                                    content={section?.content}
                                    reverseColumn={section?.reverseColumn}
                                    altText={section?.imageData?.asset?.altText}
                                    blurData={section?.imageData?.asset?.blurData} />
                            }
                            {section.layoutType === 'ButtonRightTextLeft' &&
                                <CalltoActionLeftText
                                    key={section?._key}
                                    content={section?.content}
                                />
                            }
                        </>
                    )
                }

                if (section._type === 'logos') {
                    return (
                        <LogoCloudSection
                            key={section?._key}
                            content={section?.content}
                            backgroundStyles={backgroundStyles}
                            images={section?.childImage}
                        />
                    );
                }

                if (section._type === 'pricing') {
                    return (
                        <PricingSection
                            key={section?._key}
                            packages={section?.packages}
                            columnNumber={section?.columnNumber}
                        />
                    );
                }

                if (section._type === 'testimonialBuilder') {
                    return (
                        <TestimonialSection
                            key={section?._key}
                            testimonials={allTestimonials}
                        />
                    );
                }

                if (section._type === 'featuredGrid') {
                    return (
                        <FeatureSection
                            key={section?._key}
                            columnNumber={section?.columnNumber}
                            blocks={section?.childBlocks}
                            backgroundStyles={backgroundStyles}
                        />
                    );
                }

                if (section._type === 'servicesDisplay') {
                    return (
                        <ServiceGrid
                            key={section?._key}
                            services={allServices}
                            content={section?.content}
                            imageData={section?.imageData?.asset?.url}

                        />
                    );
                }

                if (section._type === 'teamDisplay') {
                    return (
                        <TeamComponent
                            team={allTeam}
                        />
                    );
                }

                if (section._type === 'blogDisplay') {
                    return (
                        <BlogSection
                            blog={allBlog}
                        />
                    );
                }

                if (section._type === 'contactPage') {
                    return (
                        <ContactPage
                            key={section?._key}
                            content={section?.content}
                            // CONTACT
                            email={email}
                            phone_number={phone_number}
                            office_number={office_number}
                            address={address}
                            city={city}
                            state={state}
                            zip_code={zip_code}
                            // FORMS
                            emailAlerts={emailAlerts}
                            sendFrom={sendFrom}
                            emailBcc={emailBcc}
                            emailCc={emailCc}
                        />
                    );
                }

                if (section._type === 'codeBlock') {
                    return (
                        <div key={section._key}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${section?.code}`
                                }}
                            />
                        </div>
                    )
                }

                return null; // Add a default return value or handle other section types if needed
            })}
        </>
    );
}
