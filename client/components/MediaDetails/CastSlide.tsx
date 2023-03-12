import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import uiConfigs from '@/utils/config/uiConfig';
import { useQuery } from 'react-query';
import { getMediaCredits } from '@/utils/api/media.api';
import tmdbConfig from '@/utils/config/tmdbConfig';
import Link from 'next/link';
import ImageCustom from '../global/Image';
import CastItem from '../Media/CastItem';

interface CastSlideProps {
    mediaType: string;
    mediaId: string | number;
}

const CastSlide: FC<CastSlideProps> = ({ mediaType, mediaId }) => {
    const { data: credits } = useQuery(
        ['mediaCredits', mediaType, mediaId],
        () =>
            getMediaCredits({
                mediaType,
                mediaId,
            }),
        {
            enabled: !!mediaId && !!mediaType,
        }
    );

    if (!credits) return <></>;

    return (
        <Box>
            <Box sx={{ width: 'fit-content', mb: 3 }}>
                <Typography
                    textTransform={'uppercase'}
                    fontSize={'20px'}
                    fontWeight={500}
                >
                    Cast
                </Typography>
                <Box
                    sx={{
                        width: '90%',
                        height: '6px',
                        bgcolor: uiConfigs.style.red,
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    '& .swiper-slide': {
                        width: {
                            xs: '50%',
                            md: '25%',
                            lg: '25%',
                        },
                    },
                }}
            >
                <Swiper
                    slidesPerView={'auto'}
                    grabCursor={true}
                    spaceBetween={10}
                >
                    {credits.cast &&
                        credits.cast.map((actor) => {
                            return (
                                <SwiperSlide key={actor.cast_id}>
                                    <CastItem actor={actor} />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </Box>
        </Box>
    );
};

export default CastSlide;
