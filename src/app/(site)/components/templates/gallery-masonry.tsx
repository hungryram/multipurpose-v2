'use client'
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HeaderSection from "./header-section";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Pagination, Navigation])

interface Props {
    content: string;
    images: any
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any;
    disablePagination: boolean
}

const GalleryMasonry = ({ 
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles,
    images,
    disablePagination
 }: Props) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const lightboxRef = useRef<HTMLDivElement>(null);

    const openLightbox = (image: string, index: number) => {
        setLightboxOpen(true);
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedImage("");
        setCurrentIndex(0);
    };

    const handlePrevImage = () => {
        if (currentIndex > 0) {
            setSelectedImage(images[currentIndex - 1]?.asset?.url);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1]?.asset?.url);
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        if (lightboxOpen && lightboxRef.current) {
            lightboxRef.current.focus();
        }
    }, [lightboxOpen]);

    return (
        <div className="section" style={backgroundStyles}>
            <div className="container">
                {(content || primaryButtonLink || secondaryButtonLink) && (
                    <HeaderSection
                        content={content}
                        textAlign={textAlign}
                        // PRIMARY
                        buttonLink={primaryButtonLink}
                        primaryButtonText={primaryButtonText}
                        primaryButtonStyle={primaryButtonStyle}
                        // SECONDARY
                        secondaryButtonLink={secondaryButtonLink}
                        secondaryButtonText={secondaryButtonText}
                        secondaryButtonStyle={secondaryButtonStyle}
                    />
                )}
                <div className={`md:columns-3 columns-2 gap-4 ${content && 'mt-10'}`}>
                    {images.map((image: any, index: number) => (
                        <button
                            key={image.id}
                            onClick={() => openLightbox(image?.asset?.url, index)}
                            className="mb-4 cursor-pointer"
                            aria-label={`View Image ${index + 1} ${image?.asset?.altText ? `of ${image?.asset?.altText}` : ''}`}
                        >
                            <Image
                                src={image?.asset?.url}
                                alt={image?.asset?.altText}
                                width={1000}
                                height={800}
                                className={`w-full ${index % 2 === 0 ? 'aspect-video' : 'aspect-square'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
                {lightboxOpen && (
                    <Swiper
                        slidesPerView={1}
                        modules={[EffectFade, Navigation]}
                        pagination={disablePagination ? false : true}
                        className="!fixed !inset-0 !flex !items-center !justify-center z-50 bg-black bg-opacity-75"
                    >
                        {images.map((image: any, index: number) => (
                            <SwiperSlide key={image.id} className="mx-auto relative !flex !items-center !justify-center">
                                <Image
                                    src={image?.asset?.url}
                                    alt={images[currentIndex]?.asset?.altText}
                                    width={1000}
                                    height={800}
                                    sizes="100vw"
                                    placeholder={images[currentIndex]?.asset?.lqip ? 'blur' : 'empty'}
                                    blurDataURL={images[currentIndex]?.asset?.lqip}
                                />
                            </SwiperSlide>
                        ))}
                        <button
                            className="absolute top-0 right-0 m-4 text-white cursor-pointer z-50"
                            onClick={closeLightbox}
                            aria-label="Close Lightbox"
                        >
                            <XMarkIcon className="h-8 w-8" />
                        </button>
                    </Swiper>
                )}

            </div>
        </div>
    );
};

export default GalleryMasonry;
