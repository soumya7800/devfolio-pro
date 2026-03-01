import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'executing' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('executing');

        // Simulate network request
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 border-b border-borderSubtle bg-background">
            <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="inline-block font-mono text-[10px] font-bold tracking-widest uppercase text-secondary mb-4">
                        [ SECURE_CHANNEL ]
                    </div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight uppercase leading-[0.9]"
                    >
                        Initialize Connection
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="w-full border border-borderSubtle bg-surface p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Status Indicator Map */}
                    <div className="absolute top-0 left-0 w-full flex">
                        <div className={`h-1 flex-1 transition-colors duration-300 ${status === 'idle' ? 'bg-borderSubtle' : status === 'executing' ? 'bg-accent' : 'bg-green-500'}`}></div>
                    </div>

                    <div className="mb-8 flex items-center justify-between border-b border-borderSubtle pb-4">
                        <div className="flex items-center gap-3">
                            <Terminal size={16} className="text-secondary" />
                            <span className="font-mono text-xs uppercase font-bold tracking-widest text-primary">COMMUNICATION_PROTOCOL</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary border border-borderSubtle px-2 py-1 bg-background">
                            AWAITING_INPUT
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="name" className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                    {'>>'} IDENTITY (NAME)
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-background border border-borderSubtle p-4 font-mono text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                                    placeholder="GUEST_USER"
                                    disabled={status !== 'idle'}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="email" className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                    {'>>'} RETURN_ADDRESS (EMAIL)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-background border border-borderSubtle p-4 font-mono text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                                    placeholder="user@network.local"
                                    disabled={status !== 'idle'}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                {'>>'} PAYLOAD (MESSAGE)
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-background border border-borderSubtle p-4 font-mono text-sm text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="ENTER_TRANSMISSION_DATA..."
                                disabled={status !== 'idle'}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className="w-full h-[48px] bg-primary text-background font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity mt-4"
                        >
                            {status === 'idle' && (
                                <>
                                    EXECUTE_TRANSMISSION <ArrowRight size={14} />
                                </>
                            )}
                            {status === 'executing' && 'PROCESSING_REQUEST...'}
                            {status === 'success' && 'TRANSMISSION_SUCCESSFUL'}
                        </button>

                    </form>
                </motion.div>
            </div>
        </section>
    );
};
