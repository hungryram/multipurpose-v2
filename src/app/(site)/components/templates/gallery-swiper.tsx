'use client'
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HeaderSection from "./header-section";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

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
    disablePagination: boolean;
    disableNavigation: boolean;
    slideNumber: number
}

const GallerySwiper = ({
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
    disablePagination,
    disableNavigation,
    slideNumber
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
                <style jsx global>
                    {`
                        /* Custom styles for swiper navigation arrows */
                        .swiper-button-prev,
                        .swiper-button-next {
                        color: #ffffff; /* Replace with your desired color */
                        }
                    `}
                </style>
                <Swiper
                    slidesPerView={slideNumber ? slideNumber : 1}
                    spaceBetween={10}
                    effect={"slide"}
                    pagination={disablePagination ? false : true}
                    navigation={disableNavigation ? false : true}
                    className={`md:columns-3 columns-2 gap-4 ${content && 'mt-10'}`}
                >
                    {images.map((image: any, index: number) => (
                        <SwiperSlide
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
                                className={`w-full object-cover ${index % 2 === 0 ? 'aspect-video' : 'aspect-square'
                                    }`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {lightboxOpen && (
                    <Swiper
                        slidesPerView={1}
                        navigation
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

export default GallerySwiper;
