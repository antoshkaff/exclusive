'use client';

import styles from './styles.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';

type ImageGalleryProps = {
    images: string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
    const [active, setActive] = useState(0);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {images.map((image, i) => (
                    <li key={image}>
                        <button
                            onClick={() => setActive(i)}
                            className={styles.imageWrapper}
                        >
                            <Image
                                src={image}
                                alt={'product image'}
                                style={{ objectFit: 'contain', padding: 16 }}
                                fill
                                sizes="(max-width: 480px) 100vw, 100px"
                            />
                        </button>
                    </li>
                ))}
            </ul>
            <div className={styles.main}>
                <motion.div
                    key={active}
                    variants={FADEIN_VARIANTS}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    className={styles.mainImageWrapper}
                    style={{ height: 'inherit', width: 'inherit' }}
                >
                    <Image
                        src={images[active]}
                        alt={'product image'}
                        style={{ objectFit: 'contain' }}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default ImageGallery;
