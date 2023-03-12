import tmdbConfig from '@/utils/config/tmdbConfig';
import uiConfigs from '@/utils/config/uiConfig';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ImageCustom from '../global/Image';
import Rate from '../global/Rate';

interface MediaItemProps {
    rate: number,
    title: string,
    year?: string,
    poster_path: string,
    mediaType: string,
    mediaId: string | number
}

const MediaItem: FC<MediaItemProps> = ({ rate, title, year, poster_path, mediaType, mediaId }) => {
    return (
        <Link href={{
            pathname: `/${mediaType}/${mediaId}`
        }}>
            <Box
                sx={{
                    '&:hover .overlay': { opacity: 1 },
                    '&:hover .mediaBtn': { opacity: 1 },
                    '&:hover .mediaTitle': {
                        opacity: 1,
                        bottom: 0,
                    },
                    cursor: 'pointer',
                    overflow: 'hidden'
                }}
                color="text.primary"
                position='relative'
            >
                <Box position="relative" sx={{ paddingTop: '140%' }}>
                    <ImageCustom src={tmdbConfig.poster_path(poster_path)} alt={title || 'poster'} />
                    <Box
                        position={'absolute'}
                        className="overlay"
                        sx={{
                            ...uiConfigs.style.gradientBgImage.dark,
                            inset: '0',
                            opacity: 0,
                            transition: 'all .2s ease',
                        }}
                    />
                </Box>
                <Box position={'absolute'} sx={{ inset: '0' }}>
                    <Box
                        position={'absolute'}
                        sx={{
                            bottom: '-20%',
                            left: '0',
                            right: '0',
                            opacity: 0,
                            transition: 'all .4s ease',
                        }}
                        p={2}
                        display="flex"
                        flexDirection={'column'}
                        gap={0.5}
                        className="mediaTitle"
                        color="white"
                    >
                        {rate ? <Box>
                            <Rate value={rate} color='white' />
                        </Box> : ''}
                        {year &&
                            <Typography fontSize={'16px'}>
                                {year}
                            </Typography>
                        }
                        <Typography
                            fontWeight={'500'}
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box
                        position={'absolute'}
                        sx={{
                            inset: '0',
                            opacity: 0,
                            transition: 'all .4s ease',
                        }}
                        display={{ xs: 'none', md: "flex" }}
                        className="mediaBtn"
                    >
                        <Button
                            sx={{
                                backgroundColor: uiConfigs.style.red,
                                '&:hover': {
                                    backgroundColor: uiConfigs.style.redHover,
                                },
                                width: '80px',
                                color: 'white',
                                m: 'auto',
                            }}
                            size="large"
                        >
                            <PlayArrowIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Link>

    );
};

export default MediaItem;
