import React from 'react';

const Navigation = ({ account, onDisconnect, isAdmin }) => {
  return (
    <>
      {/* Floating wallet info in bottom right corner - Only this part remains */}
      {account && (
        <div className="fixed bottom-6 right-6 z-50">
          <div 
            className="glass-card p-4 rounded-xl border shadow-2xl max-w-xs"
            style={{
              background: 'rgba(26, 26, 26, 0.95)',
              borderColor: 'rgba(255, 87, 51, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Wallet Info</h3>
              {isAdmin && (
                <span 
                  className="px-2 py-1 text-xs rounded border"
                  style={{
                    background: 'rgba(255, 87, 51, 0.2)',
                    borderColor: 'rgba(255, 87, 51, 0.5)',
                    color: '#FF5733'
                  }}
                >
                  ADMIN
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-gray-400 text-xs">Address</p>
                <p 
                  className="font-mono text-sm break-all"
                  style={{ color: '#FF5733' }}
                >
                  {account}
                </p>
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={onDisconnect}
                  className="w-full px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 transition-all border border-red-500/50 text-red-500 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;