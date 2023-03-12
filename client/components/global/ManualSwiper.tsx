import React, { FC } from "react";
import { Box } from '@mui/material'
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from 'swiper';

interface ManualSwiperProps {
    children: React.ReactNode
}

const ManualSwiper: FC<ManualSwiperProps> = ({ children }) => {

    return <Box sx={{
        '& .swiper-slide': {
            width: '90%'
        },
        '& .swiper-pagination-bullet-active': {
            backgroundColor: 'white'
        },
        '& .swiper-pagination-bullet': {
            backgroundColor: 'text.primary',
        },
        '& .swiper-button-prev': {
            color: 'white',
            zIndex: 20
        },
        '& .swiper-button-next': {
            color: 'white',
            zIndex: 20
        },
    }}>
        <Box />
        <Swiper
            slidesPerView={"auto"}
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            centeredSlides={true}
        >
            {children}
        </Swiper>
    </Box>;
};

export default ManualSwiper;
