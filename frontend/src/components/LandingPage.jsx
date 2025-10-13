import React, { useState } from 'react';

// --- Placeholder Components for different views ---

/**
 * Standard container for all sub-pages
 */
const PageContainer = ({ title, children, colors }) => (
    <div 
        className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-start text-center px-4"
        style={{ backgroundColor: colors.darker, color: colors.accent }}
    >
        <h2 className="text-5xl font-extrabold uppercase mb-8" style={{ color: colors.primary }}>
            {title}
        </h2>
        <div className="max-w-4xl w-full text-white/90 text-left">
            {children}
        </div>
    </div>
);

const FeaturesPage = ({ colors }) => (
    <PageContainer title="Platform Features" colors={colors}>
        <p className="mb-6 text-lg text-white/70">
            BlockVote is designed with security and user experience at its core, leveraging the immutable nature of the blockchain.
        </p>
        <ul className="list-disc list-inside space-y-3 pl-4 text-gray-300">
            <li><strong className="text-white">Zero-Knowledge Proofs:</strong> Ensure vote anonymity while maintaining verifiability.</li>
            <li><strong className="text-white">Smart Contract Governance:</strong> All voting rules and results are enforced automatically on-chain.</li>
            <li><strong className="text-white">Decentralized Storage:</strong> Ballot data is stored across a distributed network, preventing single points of failure.</li>
            <li><strong className="text-white">Gasless Voting Options:</strong> Exploring layer 2 solutions to minimize transaction costs for voters.</li>
        </ul>
    </PageContainer>
);

const RoadmapPage = ({ colors }) => (
    <PageContainer title="Development Roadmap" colors={colors}>
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Phase 1: Launch & Core Infrastructure (Q4 2024)</h3>
            <p className="text-gray-300">Deployment on Ethereum Testnet, smart contract audit completion, and initial community testing.</p>
            
            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Phase 2: Scaling & Integration (Q1 2025)</h3>
            <p className="text-gray-300">Integration with Layer 2 scaling solutions (e.g., Polygon or Arbitrum) and development of governance dashboards.</p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Phase 3: Ecosystem Expansion (Q2 2025+)</h3>
            <p className="text-gray-300">API development for third-party integration, cross-chain support exploration, and mobile application release.</p>
        </div>
    </PageContainer>
);

const DocsPage = ({ colors }) => (
    <PageContainer title="Documentation" colors={colors}>
        <p className="mb-4 text-lg text-white/70">
            The BlockVote documentation provides comprehensive guides for deploying, participating in, and verifying elections.
        </p>
        <div className="space-y-4">
            <a href="#" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition duration-200" style={{ borderLeft: `4px solid ${colors.primary}` }}>
                <strong className="text-white block">Getting Started Guide</strong>
                <span className="text-sm text-gray-400">Step-by-step instructions for first-time users and organizations.</span>
            </a>
            <a href="#" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition duration-200" style={{ borderLeft: `4px solid ${colors.primary}` }}>
                <strong className="text-white block">Smart Contract Reference</strong>
                <span className="text-sm text-gray-400">Detailed API documentation for the Solidity contracts.</span>
            </a>
            <a href="#" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition duration-200" style={{ borderLeft: `4px solid ${colors.primary}` }}>
                <strong className="text-white block">Troubleshooting & FAQ</strong>
                <span className="text-sm text-gray-400">Common issues and solutions for decentralized voting.</span>
            </a>
        </div>
    </PageContainer>
);

const AuditPage = ({ colors }) => (
    <PageContainer title="Security Audit" colors={colors}>
        <p className="mb-6 text-lg text-white/70">
            BlockVote is committed to transparency and security. Our smart contracts undergo regular, rigorous audits by leading blockchain security firms.
        </p>
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Latest Audit Report: V1.0 (September 2024)</h3>
            <p className="text-gray-300">Conducted by **CertiK**.</p>
            <p className="text-gray-300">**Findings:** 0 Critical, 1 Major (Resolved), 3 Minor.</p>
            <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 mt-4 text-sm font-semibold rounded-lg text-white transition-all duration-300"
                style={{ backgroundColor: colors.primary }}
            >
                View Full Report
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
        </div>
    </PageContainer>
);


// --- Navigation Component (Updated as requested) ---

const Navbar = ({ colors, currentPage, onNavigate, account, statusMessage, isConnecting, onVoteNavigate, onAdminNavigate, isAdmin }) => {
    // Nav items map page names (key for state) to their display text
    const navItems = {
        'home': 'Home',
        'features': 'Features',
        'roadmap': 'Roadmap',
        'docs': 'Docs',
        'audit': 'Audit'
    };
    
    // Determine status styling
    let statusClasses = 'border-white/20 text-white/50';
    if (isConnecting) {
        statusClasses = 'border-yellow-500 text-yellow-500 animate-pulse';
    } else if (account) {
        statusClasses = 'border-green-500 text-green-500';
    } else if (statusMessage.includes('rejected') || statusMessage.includes('not found')) {
        statusClasses = 'border-red-500 text-red-500';
    }

    const handleStatusClick = () => {
        if (account) {
            onVoteNavigate(); // Navigate to voting page when clicked
        }
    };
    
    // Determine displayed status message
    const displayStatus = account 
        ? `Account: ${account.substring(0, 6)}...` 
        : isConnecting 
        ? 'Connecting...' 
        : statusMessage.includes('Connected') 
        ? 'Wallet Connected'
        : 'Disconnected';


    return (
        <nav 
            // 💥 MODIFIED: Removed 'border-b border-white/10 shadow-lg' and added 'bg-black/50 shadow-2xl'
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 shadow-2xl`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
                {/* Logo/Title now acts as the Home button */}
                <button onClick={() => onNavigate('home')} className="flex items-center focus:outline-none">
                    <svg className={`w-8 h-8 mr-2`} style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z" />
                    </svg>
                    <span className="text-xl font-extrabold tracking-widest text-white">BLOCKVOTE</span>
                </button>
                
                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    {Object.entries(navItems).map(([key, display]) => (
                        <button 
                            key={key}
                            onClick={() => onNavigate(key)}
                            className={`
                                text-sm font-medium uppercase transition-colors duration-200 relative group focus:outline-none
                                ${currentPage === key ? 'text-white' : 'text-white/70 hover:text-white'}
                            `}
                            // 💥 MODIFIED: Removed the inline style for text color here. The active color will be handled by the underline instead.
                        >
                            {display}
                            {/* Active/Hover Underline effect */}
                            <span 
                                className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 
                                    ${currentPage === key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                style={{ backgroundColor: colors.primary }} // 💥 ADDED: Use primary color for the underline
                            ></span>
                        </button>
                    ))}
                </div>
                
                {/* Wallet Status Display and Vote Button */}
                <div className="flex items-center gap-4">
                    {/* Vote Button - Only show when wallet is connected */}
                    {account && (
                        <button
                            onClick={onVoteNavigate}
                            className="px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
                            style={{ 
                                backgroundColor: colors.primary,
                                color: colors.darker,
                                boxShadow: `0 0 15px ${colors.primary}80`
                            }}
                        >
                            Vote
                        </button>
                    )}
                    
                    {/* Admin Button - Only show when user is admin */}
                    {account && isAdmin && (
                        <button
                            onClick={onAdminNavigate}
                            className="px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 border-2"
                            style={{ 
                                borderColor: colors.primary,
                                color: colors.primary,
                                boxShadow: `0 0 15px ${colors.primary}40`
                            }}
                        >
                            Admin
                        </button>
                    )}
                    
                    {/* Wallet Status Display */}
                    <div onClick={handleStatusClick}
                        className={`px-4 py-1 text-sm font-semibold rounded-full border transition-colors duration-300 max-w-[200px] truncate cursor-pointer ${statusClasses}`}
                        title={account ? account : statusMessage}
                    >
                        {displayStatus}
                    </div>
                </div>
            </div>
        </nav>
    );
};


// --- Home Page Component (Updated to show connected state and Vote button) ---

const HomePage = ({ onConnect, colors, account, isConnecting, statusMessage, onVoteNavigate, onAdminNavigate, isAdmin }) => {
    // Subtle dark grid pattern for texture (using data URL for single file)
    const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg opacity='0.08'%3E%3Cpath fill='%23FF4500' d='M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z'/%3E%3C/g%3E%3C/svg%3E")`;

    const FeatureCard = ({ title, description, icon, colorClass }) => (
        <div className={`p-5 rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:border-white/30 cursor-default bg-black/50 backdrop-blur-sm`}>
            {/* Dynamic colors moved to inline styles for background and shadow */}
            <div 
                className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg`}
                style={{ 
                    backgroundColor: colorClass.includes('accent') ? colors.accent : colors.primary,
                    boxShadow: `0 0 10px ${colors.primary}55`
                }}
            >
                {/* Dynamic text color applied to SVG */}
                {React.cloneElement(icon, { 
                    className: icon.props.className.replace('text-darker', 'text-black') // Ensures icons are black/dark against the bright backgrounds
                })}
            </div>
            <h3 className="text-lg font-extrabold mb-1 text-white uppercase tracking-wider">{title}</h3>
            <p className="text-gray-400 text-xs">{description}</p>
        </div>
    );

    return (
        <div 
            className={`min-h-[calc(100vh-64px)] w-screen relative overflow-x-hidden font-inter flex items-center justify-center`} 
            style={{ 
                backgroundImage: gridPattern,
            }}
        >
            {/* 🚀 Main Content Wrapper (Centered) */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 text-center backdrop-blur-sm">
                
                <div className="mb-4">
                    <h1 
                        className={`text-6xl md:text-7xl font-black mb-2 uppercase tracking-tighter`}
                        style={{ 
                            color: colors.accent,
                            textShadow: `0 0 15px ${colors.primary}55, 0 0 30px ${colors.primary}33`
                        }}
                    >
                        BlockVote
                    </h1>
                    <p 
                        className={`text-xl md:text-2xl font-light tracking-widest`}
                        style={{ color: colors.primary }}
                    >
                        THE DECENTRALIZED MANDATE
                    </p>
                </div>

                <p className="text-lg text-white/80 mb-6 max-w-3xl mx-auto font-medium">
                    A secure, borderless, and tamper-proof voting system built on the Ethereum blockchain. Empower your voice with verifiable, transparent technology.
                </p>
                
                {/* Connect Button and Vote Button Container */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    {/* Connect Button (Primary CTA) - Updated with state logic */}
                    <button
                        onClick={onConnect}
                        disabled={account || isConnecting}
                        className={`
                            relative overflow-hidden group 
                            text-xl font-black uppercase tracking-widest 
                            px-12 py-4 rounded-xl transition-all duration-300
                            shadow-xl border-3
                            ${account ? 'cursor-not-allowed opacity-70' : ''}
                        `}
                        style={{ 
                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)',
                            backgroundColor: account ? '#10B981' : colors.primary, // Green when connected
                            color: colors.accent,
                            borderColor: account ? '#10B981' : colors.primary,
                            boxShadow: account ? `0 0 25px #10B98180` : `0 0 25px ${colors.primary}80`
                        }}
                    >
                        {/* Neon Glow Effect */}
                        <span 
                            className={`absolute inset-0 block opacity-0 group-hover:opacity-90 transition-opacity duration-300`}
                            style={{ backgroundColor: colors.darker }}
                        ></span>
                        
                        {/* Button Text and Icon */}
                        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white/90 transition-colors duration-300">
                            {isConnecting && (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {(!isConnecting && !account) && (
                                <svg className="w-5 h-5 animate-pulse-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.004a2 2 0 01-.485-.068l-3.5-1A2 2 0 0111 2h3z" />
                                </svg>
                            )}
                            {account ? 'Wallet Connected' : isConnecting ? 'Connecting...' : 'Connect Wallet'}
                        </span>
                    </button>
                    
                    {/* Vote Button - Only show when wallet is connected */}
                    {account && (
                        <button
                            onClick={onVoteNavigate}
                            className="px-12 py-4 text-xl font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-105"
                            style={{ 
                                backgroundColor: colors.primary,
                                color: colors.darker,
                                boxShadow: `0 0 25px ${colors.primary}80`,
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)'
                            }}
                        >
                            Go Vote Now
                        </button>
                    )}
                    
                    {/* Admin Button - Only show when user is admin and wallet is connected */}
                    {account && isAdmin && (
                        <button
                            onClick={onAdminNavigate}
                            className="px-12 py-4 text-xl font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-105 border-2"
                            style={{ 
                                borderColor: colors.primary,
                                color: colors.primary,
                                boxShadow: `0 0 25px ${colors.primary}40`,
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)'
                            }}
                        >
                            Admin Dashboard
                        </button>
                    )}
                </div>
                
                <p className={`mt-4 mb-8 text-xs ${account ? 'text-green-400' : statusMessage.includes('error') ? 'text-red-400' : 'text-gray-500/80'}`}>
                    {account ? `Successfully connected to ${account}` : statusMessage}
                </p>
                
                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Secure"
                        description="Votes are cryptographically sealed, guaranteeing integrity."
                        colorClass="primary" 
                        icon={<svg className={`w-6 h-6 text-darker`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                    />
                    
                    <FeatureCard
                        title="Transparent"
                        description="Voting process is verifiable by all participants on-chain."
                        colorClass="accent" 
                        icon={<svg className={`w-6 h-6 text-darker`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    />
                    
                    <FeatureCard
                        title="Instant"
                        description="Results are tallied instantly upon vote submission."
                        colorClass="primary" 
                        icon={<svg className={`w-6 h-6 text-darker`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    />
                </div>
            </div>
        </div>
    );
};


// --- Main App Component (Implements Routing and Wallet Logic) ---

const LandingPage = ({ onConnect, account, isConnecting, statusMessage, onVoteNavigate, onAdminNavigate, isAdmin }) => {
    // Define custom Tailwind colors for the theme
    const colors = {
        primary: '#FF4500', // Deep Orange (Orangered)
        accent: '#FFFFFF',  // Pure White
        dark: '#0A0A0A',    // Near Black
        darker: '#000000',  // Pure Black
    };

    // State for application navigation
    const [currentPage, setCurrentPage] = useState('home');

    // Function to render the active page component
    const renderPage = () => {
        // Pass account, isConnecting, and statusMessage to HomePage for display logic
        switch (currentPage) {
            case 'home':
                return <HomePage 
                            onConnect={onConnect} 
                            colors={colors} 
                            account={account} 
                            isConnecting={isConnecting}
                            statusMessage={statusMessage}
                            onVoteNavigate={onVoteNavigate}
                            onAdminNavigate={onAdminNavigate}
                            isAdmin={isAdmin}
                        />;
            case 'features':
                return <FeaturesPage colors={colors} />;
            case 'roadmap':
                return <RoadmapPage colors={colors} />;
            case 'docs':
                return <DocsPage colors={colors} />;
            case 'audit':
                return <AuditPage colors={colors} />;
            default:
                return <HomePage 
                            onConnect={onConnect} 
                            colors={colors} 
                            account={account} 
                            isConnecting={isConnecting}
                            statusMessage={statusMessage}
                            onVoteNavigate={onVoteNavigate}
                            onAdminNavigate={onAdminNavigate}
                            isAdmin={isAdmin}
                        />;
        }
    };
    
    return (
        <div 
            className={`min-h-screen w-screen relative overflow-x-hidden font-inter`} 
            style={{ 
                fontFamily: 'Inter, sans-serif', 
                backgroundColor: colors.darker,
            }}
        >
            {/* 1. STICKY NAVBAR: Passes wallet state and navigation - NOW TRANSPARENT */}
            <Navbar 
                colors={colors} 
                currentPage={currentPage} 
                onNavigate={setCurrentPage}
                account={account}
                statusMessage={statusMessage}
                isConnecting={isConnecting}
                onVoteNavigate={onVoteNavigate}
                onAdminNavigate={onAdminNavigate}
                isAdmin={isAdmin}
            />
            
            {/* 💥 Ambient Lighting Effects */}
            <div 
                className={`absolute top-[-100px] left-[-100px] w-[50vw] h-[50vw] rounded-full blur-[80px] animate-pulse-slow`}
                style={{ backgroundColor: colors.primary, opacity: 0.05 }}
            ></div>
            <div 
                className={`absolute bottom-[-100px] right-[-100px] w-[60vw] h-[60vw] rounded-full blur-[90px] animate-pulse-slow`} 
                style={{ animationDelay: '-2s', backgroundColor: colors.accent, opacity: 0.05 }}
            ></div>
            
            {/* 2. PAGE CONTENT: The main content area with top padding to clear the navbar */}
            <main className="pt-[68px]">
                {renderPage()}
            </main>

            {/* CSS Keyframes for pulse effect (Required for the lighting effects) */}
            <style jsx="true">{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.05; }
                    50% { transform: scale(1.05); opacity: 0.08; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 15s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;