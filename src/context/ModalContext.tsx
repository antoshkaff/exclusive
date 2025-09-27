'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import Modal from '@/components/layout/Modal';
import { AnimatePresence, motion } from 'framer-motion';

interface IModalState {
    isOpen: boolean;
}

interface IModalActions {
    openModal: (modalContent: ModalContent) => void;
    closeModal: () => void;
}

export type ModalTypes = 'success' | 'error' | 'warning';
type ModalContent = {
    title: string;
    type: ModalTypes;
    content: ReactNode;
    action?: () => void;
};

const ModalStateContext = createContext<IModalState | null>(null);
const ModalActionContext = createContext<IModalActions | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent>({
        title: '',
        type: 'warning',
        content: '',
    });

    const closeModal = () => {
        setIsOpen(false);
        setModalContent({ title: '', type: 'warning', content: '' });
    };

    const openModal = (modalContent: ModalContent) => {
        setIsOpen(true);
        setModalContent(modalContent);
    };

    const state = useMemo(() => ({ isOpen }), [isOpen]);
    const actions = useMemo(
        () => ({
            openModal,
            closeModal,
        }),
        [openModal, closeModal],
    );

    return (
        <ModalActionContext.Provider value={actions}>
            <ModalStateContext.Provider value={state}>
                {children}
                <AnimatePresence mode={'wait'}>
                    {isOpen && (
                        <Modal
                            title={modalContent.title}
                            type={modalContent.type}
                            onClose={closeModal}
                            action={modalContent?.action}
                        >
                            {modalContent?.content}
                        </Modal>
                    )}
                </AnimatePresence>
            </ModalStateContext.Provider>
        </ModalActionContext.Provider>
    );
};

export const useModalActions = () => {
    const ctx = useContext(ModalActionContext);
    if (!ctx)
        throw new Error(
            'useModalActions must be used within ModalActionContext',
        );
    return ctx;
};

export const useModalState = () => {
    const ctx = useContext(ModalStateContext);
    if (!ctx)
        throw new Error('useAuthState must be used within ModalStateContext');
    return ctx;
};
