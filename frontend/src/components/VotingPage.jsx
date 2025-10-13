import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Global Styles & Constants ---
// Define color variables and common styles once
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Inter:wght@400;600;800&display=swap');
    
    .font-main { font-family: 'Oswald', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }

    /* The main color (deep orange/red) */
    :root {
      --color-primary: #FF5733; 
      --color-dark-bg: #121212;
      --color-card-bg: #1A1A1A;
      --color-grid: #FF573308;
    }

    .bg-grid-overlay {
      background-image: 
        linear-gradient(to right, var(--color-grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px);
      background-size: 50px 50px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }
    
    .card-panel {
        background-color: var(--color-card-bg);
        border-radius: 6px;
        border: 1px solid #333333;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease;
        position: relative;
        z-index: 10;
    }

    .text-primary-accent {
        color: var(--color-primary);
    }
    
    .primary-button {
      background-color: var(--color-primary);
      color: #121212; /* Dark text for contrast */
      font-weight: 700;
      padding: 1rem 2.5rem;
      border-radius: 6px;
      transition: background-color 0.3s ease, transform 0.1s ease;
      border: 2px solid transparent;
      text-transform: uppercase;
    }
    .primary-button:hover:not(:disabled) {
      background-color: #FF7043; 
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 87, 51, 0.4);
    }
    .primary-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    /* Admin Panel Specific Styles */
    .btn-primary {
      background: var(--color-primary);
      color: #121212;
      padding: 0.75rem 1.5rem;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(255, 87, 51, 0.4);
      transition: all 0.2s ease;
      text-align: center;
    }
    .btn-primary:hover:not(:disabled) {
        background: #FF7855;
        box-shadow: 0 6px 15px rgba(255, 87, 51, 0.6);
        transform: translateY(-1px);
    }
    .btn-primary:disabled {
        background: #333;
        color: #888;
        cursor: not-allowed;
        box-shadow: none;
    }

    .input-style {
      background-color: #0d0d0d; 
      border: 1px solid #444444;
      padding: 12px;
      color: white;
      font-family: 'Inter', sans-serif;
      border-radius: 4px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .input-style:focus {
      border-color: var(--color-primary);
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 87, 51, 0.3); 
    }
    
    .select-style {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23FF5733' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.5em 1.5em;
    }
  `}</style>
);


// --------------------------------------------------------------------------------
// --- VOTING PAGE Component ---
// --------------------------------------------------------------------------------
const VotingPage = ({ organization, candidates, onVote, onBack, hasVoted }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  // Check if the user has voted for the current organization
  const voted = hasVoted(organization.id);

  const handleVote = async () => {
    if (!selectedCandidate || voted) return;

    setIsVoting(true);
    try {
      // Execute the provided onVote function
      await onVote(organization.id, selectedCandidate.id);
    } catch (error) {
      console.error('Voting error:', error);
    }
    setIsVoting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-white font-body">
      <GlobalStyles />
      <div className="bg-grid-overlay"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-primary-accent transition-colors mb-8 font-body text-sm p-2 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Organizations
        </button>

        {/* Organization Header */}
        <div className="card-panel p-6 sm:p-8 mb-8 border-l-4 border-[var(--color-primary)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 font-main text-white tracking-wide">
                {organization.name}
              </h2>
              <p className="text-gray-400 font-body">Select your preferred candidate below to cast your secure vote.</p>
            </div>
            {voted && (
              <div className="card-panel px-6 py-3 border-green-600/50 mt-4 sm:mt-0">
                <div className="flex items-center gap-2 text-green-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-lg">VOTE RECORDED</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Candidates Grid */}
        {candidates.length === 0 ? (
          <div className="card-panel p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No Candidates Available</h3>
            <p className="text-gray-500 font-body">The organization has not yet added candidates for this vote.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => !voted && setSelectedCandidate(candidate)}
                className={`card-panel p-6 transition-all relative overflow-hidden h-full flex flex-col justify-between
                  ${voted ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer group hover:shadow-lg hover:shadow-gray-900'}
                  ${selectedCandidate?.id === candidate.id
                    ? 'border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/40'
                    : 'border-gray-700 hover:border-gray-600/50'
                  }`}
              >
                {/* Selection Indicator */}
                {selectedCandidate?.id === candidate.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary-accent rounded-full flex items-center justify-center border-2 border-white/50">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                <div className="text-center">
                  {/* Candidate Avatar */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center border border-gray-700/50">
                    <svg className="w-12 h-12 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                  {/* Candidate Info */}
                  <h3 className="text-2xl font-bold text-center mb-3 text-white font-main">{candidate.name}</h3>
                </div>

                {/* Stat/Manifesto Placeholder */}
                <div className="bg-[var(--color-dark-bg)] border border-gray-700/50 rounded-md p-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Initiatives Announced:</span>
                    <span className="text-primary-accent font-semibold text-md">
                      {candidate.placeholderVotes.toString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vote Button */}
        {!voted && candidates.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleVote}
              disabled={!selectedCandidate || isVoting}
              className={`primary-button text-xl px-12 py-4 shadow-xl 
                ${!selectedCandidate || isVoting ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(255,87,51,0.5)]'}`
              }
            >
              {isVoting ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  TRANSMITTING VOTE...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  CAST VOTE NOW
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// --- ADMIN DASHBOARD Component ---
// --------------------------------------------------------------------------------
const AdminDashboard = ({ organizations, onAddOrganization, onAddCandidate, onBack }) => {
  // Toggle between forms. Default to 'org' if no orgs exist, otherwise 'candidate'.
  const [activeForm, setActiveForm] = useState('org');
  
  const [selectedOrgId, setSelectedOrgId] = useState(null); 
  const [orgName, setOrgName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Use the organizations prop directly, enriched with candidate counts
  const displayOrganizations = organizations || [];
  const orgCount = displayOrganizations.length;

  // Set default selected organization for the candidate form
  useEffect(() => {
    if (orgCount > 0 && selectedOrgId === null) {
      setSelectedOrgId(displayOrganizations[0].id);
      setActiveForm('candidate');
    } else if (orgCount === 0) {
      setActiveForm('org');
      setSelectedOrgId(null);
    }
  }, [orgCount, displayOrganizations, selectedOrgId]);

  // --- Handlers ---
  const handleAddOrganizationSubmit = async (e) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    
    setIsProcessing(true);
    try {
      await onAddOrganization(orgName); 
      setOrgName('');
      setActiveForm('candidate'); // Switch to candidate form after adding an organization
    } catch (error) {
      console.error('Error adding organization:', error);
    }
    setIsProcessing(false);
  };

  const handleAddCandidateSubmit = async (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !selectedOrgId) return; 
    
    setIsProcessing(true);
    try {
      await onAddCandidate(candidateName, selectedOrgId); 
      setCandidateName('');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
    setIsProcessing(false);
  };

  // --- Rendering ---
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white font-body">
      <GlobalStyles />
      <div className="bg-grid-overlay"></div>

      {/* Tighter Max Width for Admin Console */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button
          onClick={onBack} // This will now switch back to the main list view in App
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 text-sm uppercase font-semibold tracking-wider p-2 rounded-full hover:bg-white/5"
        >
          <svg className="w-4 h-4 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Voting Area
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center border border-[var(--color-primary)]/50">
              <svg className="w-8 h-8 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-main text-white mb-1 tracking-wider">
                ADMIN CONSOLE
              </h2>
              <p className="text-gray-400 font-body">Manage voting organizations and candidates</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Toggle Form View) */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          <button
            onClick={() => setActiveForm('org')} 
            className={`card-panel p-6 text-left transition-all group border-2 ${activeForm === 'org' ? 'border-primary-accent shadow-lg shadow-primary-accent/30' : 'border-gray-700 hover:border-primary-accent/50'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors border border-gray-700/50">
                <svg className={`w-6 h-6 text-primary-accent transition-colors ${activeForm === 'org' ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 font-body text-white">Add Organization</h3>
                <p className="text-gray-400 text-sm font-body">Create a new voting sector</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveForm('candidate')} 
            disabled={orgCount === 0}
            className={`card-panel p-6 text-left transition-all group border-2 ${activeForm === 'candidate' && orgCount > 0 ? 'border-primary-accent shadow-lg shadow-primary-accent/30' : 'border-gray-700 hover:border-primary-accent/50'} ${orgCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors border border-gray-700/50">
                <svg className={`w-6 h-6 text-primary-accent transition-colors ${activeForm === 'candidate' ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 font-body text-white">Add Candidate</h3>
                <p className="text-gray-400 text-sm font-body">Add a candidate to an organization</p>
              </div>
            </div>
          </button>
        </div>

        {/* --- FORM CONTAINER --- */}
        <div className="bg-[var(--color-dark-bg)] p-6 rounded-lg shadow-inner border border-gray-800 mb-12">
            
          {/* Add Organization Form */}
          {activeForm === 'org' && (
            <div className="p-2">
              <h3 className="text-2xl font-bold mb-6 text-primary-accent font-main tracking-wider border-b border-gray-700 pb-3">CREATE NEW ORGANIZATION</h3>
              <form onSubmit={handleAddOrganizationSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 font-body font-semibold">Organization Name</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g., Student Senate Election, Research Board Vote"
                    className="w-full input-style rounded-lg"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div className="flex gap-4 justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing || !orgName.trim()}
                    className="btn-primary font-body flex items-center gap-2 text-sm"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESSING...
                      </>
                    ) : 'ADD ORGANIZATION'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Candidate Form */}
          {activeForm === 'candidate' && (
            <div className="p-2">
              <h3 className="text-2xl font-bold mb-6 text-primary-accent font-main tracking-wider border-b border-gray-700 pb-3">ADD NEW CANDIDATE</h3>
              <form onSubmit={handleAddCandidateSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 font-body font-semibold">Select Organization</label>
                  <div className="relative">
                    <select
                      value={selectedOrgId || ''}
                      onChange={(e) => setSelectedOrgId(Number(e.target.value))}
                      className="w-full input-style select-style rounded-lg"
                      required
                      disabled={isProcessing || orgCount === 0}
                    >
                      <option value="" disabled className="bg-gray-900 text-gray-500">--- Choose an organization ---</option>
                      {displayOrganizations.map((org) => (
                        <option key={org.id} value={org.id} className="bg-gray-900 text-white">
                          {org.name} (Candidates: {org.candidateCount})
                        </option>
                      ))}
                    </select>
                    {orgCount === 0 && (
                      <p className="text-sm text-red-400 mt-2">No organizations available. Please create one first.</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 font-body font-semibold">Candidate Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g., Alex Johnson"
                    className="w-full input-style rounded-lg"
                    required
                    disabled={isProcessing || orgCount === 0}
                  />
                </div>
                <div className="flex gap-4 justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing || !candidateName.trim() || !selectedOrgId || orgCount === 0}
                    className="btn-primary font-body flex items-center gap-2 text-sm"
                  >
                    {isProcessing ? (
                        <>
                        <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESSING...
                        </>
                    ) : 'ADD CANDIDATE'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Organizations List */}
        <div className="card-panel p-8">
          <h3 className="text-2xl font-bold mb-6 text-white font-main tracking-wider border-b border-gray-700 pb-3">ACTIVE ORGANIZATIONS ({orgCount})</h3>
          {orgCount === 0 ? (
            <p className="text-gray-400 text-center py-8 font-body">No organizations added yet. Use the 'Add Organization' panel above to begin.</p>
          ) : (
            <div className="space-y-4">
              {displayOrganizations.map((org) => (
                <div 
                  key={org.id} 
                  className="card-panel p-4 border-l-4 border-l-gray-700 hover:border-l-primary-accent transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold mb-1 text-white">{org.name}</h4>
                      <p className="text-gray-500 text-sm font-body">
                        Deployed with <span className="text-primary-accent font-semibold">{org.candidateCount || 0}</span> candidate(s)
                      </p>
                    </div>
                    <div className="text-sm font-body font-semibold bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
                      ORG ID: <span className="text-white">{org.id.toString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --------------------------------------------------------------------------------
// --- ORGANIZATION LIST Component (Main User View) ---
// --------------------------------------------------------------------------------
const OrganizationList = ({ organizations, onSelectOrg, onGoToAdmin, hasVoted }) => {
  const orgCount = organizations.length;
  
  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white font-body">
        <GlobalStyles />
        <div className="bg-grid-overlay"></div>

        <div className="max-w-6xl mx-auto relative z-10">

            {/* Header and Admin Button */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-5xl font-extrabold font-main text-white tracking-wider">
                    ACTIVE VOTING ROUNDS
                </h1>
                <button
                    onClick={onGoToAdmin}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-accent transition-colors text-sm uppercase font-semibold p-3 rounded-lg border border-gray-700 hover:border-primary-accent/50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Console
                </button>
            </div>

            <p className="text-gray-400 mb-8 max-w-2xl font-body">
                Select an organization below to view the candidates and cast your secure ballot.
                Total active organizations: <span className="text-primary-accent font-semibold">{orgCount}</span>
            </p>

            {/* Organizations Grid */}
            {orgCount === 0 ? (
                <div className="card-panel p-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-400 mb-2">No Active Voting Rounds</h3>
                    <p className="text-gray-500 font-body">The system is awaiting deployment of the first organization by the Admin.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {organizations.map((org) => {
                        const voted = hasVoted(org.id);
                        const canVote = org.candidateCount > 0;

                        return (
                            <button
                                key={org.id}
                                onClick={() => canVote && onSelectOrg(org)}
                                disabled={!canVote}
                                className={`card-panel p-6 text-left transition-all duration-300 flex flex-col h-full 
                                    ${canVote ? 'cursor-pointer hover:border-primary-accent/70 hover:shadow-xl hover:shadow-gray-900' : 'opacity-60 cursor-not-allowed'} 
                                    ${voted ? 'border-green-600/50' : 'border-gray-700'}`}
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="text-2xl font-main font-bold text-white mb-2 leading-tight">
                                        {org.name}
                                    </h3>
                                    {voted ? (
                                        <div className="flex items-center gap-1 text-sm font-semibold text-green-500 bg-green-900/20 px-3 py-1 rounded-full border border-green-600/50">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Voted
                                        </div>
                                    ) : (
                                        <div className="text-sm font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-gray-700">
                                            Pending
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm font-body mt-1 flex-grow">
                                    {voted 
                                        ? "Your vote has been securely recorded for this round." 
                                        : (canVote 
                                            ? "Click to review candidates and cast your ballot." 
                                            : "Awaiting candidate deployment from the Admin Console.")}
                                </p>
                                <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Candidates:</span>
                                    <span className="text-primary-accent font-semibold text-lg">{org.candidateCount}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    </div>
  );
};


// --------------------------------------------------------------------------------
// --- MAIN APPLICATION Component ---
// --------------------------------------------------------------------------------
const App = () => {
  // Use unique IDs for organizations and candidates
  const [nextOrgId, setNextOrgId] = useState(4);
  const [nextCandidateId, setNextCandidateId] = useState(300);

  // Central State: Organizations (List) and Candidates (Map by Org ID)
  const [organizations, setOrganizations] = useState([
    { id: 1, name: "Student Council Election" },
    { id: 2, name: "Department Head Vote" },
    { id: 3, name: "Quarterly Research Budget" },
  ]);
  
  // placeholderVotes is used for the 'Initiatives' count in the UI.
  const [candidatesByOrg, setCandidatesByOrg] = useState({
    1: [{ id: 101, name: "A.I. Alpha", placeholderVotes: 50 }],
    2: [{ id: 201, name: "Dr. Smith", placeholderVotes: 120 }, { id: 202, name: "Dr. Chang", placeholderVotes: 90 }],
    3: [],
  });

  // User State: Tracks which organization IDs the user has already voted in.
  const [votedOrgIds, setVotedOrgIds] = useState(new Set()); 
  
  // Navigation State
  const [view, setView] = useState('list'); // 'list' | 'voting' | 'admin'
  const [selectedOrg, setSelectedOrg] = useState(null);

  // --- Derived State (for Organization List) ---
  const organizationsWithCount = useMemo(() => {
    return organizations.map(org => ({
      ...org,
      candidateCount: candidatesByOrg[org.id]?.length || 0,
    }));
  }, [organizations, candidatesByOrg]);

  // --- Admin Handlers ---

  const handleAddOrganization = useCallback((name) => {
    return new Promise(resolve => setTimeout(() => {
      const newOrgId = nextOrgId;
      const newOrg = { id: newOrgId, name };
      
      setOrganizations(prev => [...prev, newOrg]);
      setCandidatesByOrg(prev => ({ ...prev, [newOrgId]: [] }));
      setNextOrgId(prev => prev + 1);
      
      console.log('Added organization:', newOrg);
      resolve();
    }, 500));
  }, [nextOrgId]);

  const handleAddCandidate = useCallback((candidateName, orgId) => {
    return new Promise(resolve => setTimeout(() => {
      const orgIdNum = Number(orgId);
      const newCandidateId = nextCandidateId;
      
      const newCandidate = { 
          id: newCandidateId, 
          name: candidateName, 
          // Assign a random placeholder value for the 'Initiatives' display
          placeholderVotes: Math.floor(Math.random() * 500) + 100 
      }; 
      
      setCandidatesByOrg(prev => ({
        ...prev,
        [orgIdNum]: [...(prev[orgIdNum] || []), newCandidate],
      }));
      setNextCandidateId(prev => prev + 1);
      
      console.log(`Added candidate "${candidateName}" to organization ID: ${orgIdNum}`);
      resolve();
    }, 500));
  }, [nextCandidateId]);

  // --- Voting Handlers & Navigation ---

  const handleSelectOrg = useCallback((org) => {
    setSelectedOrg(org);
    setView('voting');
  }, []);

  const handleGoToAdmin = useCallback(() => {
    setView('admin');
  }, []);
  
  const handleBackToMain = useCallback(() => {
    setView('list');
    setSelectedOrg(null);
  }, []);
  
  const hasVotedForOrg = useCallback((orgId) => {
    return votedOrgIds.has(orgId);
  }, [votedOrgIds]);
  
  const handleVote = useCallback(async (orgId, candidateId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update voted status
    setVotedOrgIds(prev => new Set(prev).add(orgId));
    console.log(`Vote successfully cast for Candidate ${candidateId} in Org ${orgId}.`);
    
    // Optionally, navigate back to the list after voting
    // handleBackToMain();
  }, []);

  // --- Render based on View State ---

  let content;
  
  switch (view) {
    case 'admin':
      content = (
        <AdminDashboard 
          organizations={organizationsWithCount} 
          onAddOrganization={handleAddOrganization} 
          onAddCandidate={handleAddCandidate} 
          onBack={handleBackToMain} 
        />
      );
      break;
      
    case 'voting':
      const currentCandidates = candidatesByOrg[selectedOrg?.id] || [];
      content = selectedOrg ? (
        <VotingPage 
          organization={selectedOrg} 
          candidates={currentCandidates} 
          onVote={handleVote} 
          onBack={handleBackToMain} 
          hasVoted={hasVotedForOrg} 
        />
      ) : (
        <OrganizationList 
          organizations={organizationsWithCount}
          onSelectOrg={handleSelectOrg}
          onGoToAdmin={handleGoToAdmin}
          hasVoted={hasVotedForOrg}
        />
      );
      break;
      
    case 'list':
    default:
      content = (
        <OrganizationList 
          organizations={organizationsWithCount}
          onSelectOrg={handleSelectOrg}
          onGoToAdmin={handleGoToAdmin}
          hasVoted={hasVotedForOrg}
        />
      );
      break;
  }
  
  return content;
};

export default App;
