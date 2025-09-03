import React from 'react';

// Simple dashboard without external chart dependencies
const ComfortPactDashboard = () => {
  // Data
  const overallDistribution = [
    { name: 'High (≥80%)', value: 5, color: '#22c55e', percentage: 35.7 },
    { name: 'Medium (50-79%)', value: 3, color: '#f59e0b', percentage: 21.4 },
    { name: 'Low (<50%)', value: 6, color: '#ef4444', percentage: 42.9 }
  ];

  const pillarPerformance = [
    { pillar: 'COMFORT POSITIONS', avgCompliance: 90.9, level: 'High', rank: 1 },
    { pillar: 'COMMUNICATION', avgCompliance: 72.4, level: 'Medium', rank: 2 },
    { pillar: 'PREPARATION', avgCompliance: 51.0, level: 'Medium', rank: 3 },
    { pillar: 'MEDICATION', avgCompliance: 36.0, level: 'Low', rank: 4 },
    { pillar: 'ALTERNATE FOCUS', avgCompliance: 15.8, level: 'Low', rank: 5 }
  ];

  const detailedMetrics = [
    { pillar: 'MEDICATION', metric: 'Did you apply a topical analgesic prior to your visit to the Lab?', compliance: 16.36, level: 'Low' },
    { pillar: 'MEDICATION', metric: 'If yes, was a topical analgesic offered to you?', compliance: 55.56, level: 'Medium' },
    { pillar: 'PREPARATION', metric: 'After collecting the requisition, did the registration clerk ask the family or patient if they had any questions pertaining to the procedure?', compliance: 3.64, level: 'Low' },
    { pillar: 'PREPARATION', metric: 'If met with questions or concerns, was the phlebotomist able to sufficiently alleviate stress and concern using familiar words before blood was drawn?', compliance: 100.00, level: 'High' },
    { pillar: 'PREPARATION', metric: 'Once the family is directed to the room where their blood sample will be collected, did the phlebotomist engage in small talk to comfort the family or patient?', compliance: 31.48, level: 'Low' },
    { pillar: 'PREPARATION', metric: 'Did the phlebotomist ensure to engage in communication regarding preparation using language understood by both, the family, and the child?', compliance: 63.64, level: 'Medium' },
    { pillar: 'PREPARATION', metric: 'Did the phlebotomist introduce themselves appropriately to both, the family and the child and engage in rapport building by checking in on how they were doing and/or how the child is feeling today?', compliance: 20.37, level: 'Low' },
    { pillar: 'PREPARATION', metric: 'Did the phlebotomist engage with the caregiver to explore how they would participate in supporting the child?', compliance: 86.84, level: 'High' },
    { pillar: 'COMMUNICATION', metric: 'Did the phlebotomist use possibility language and developmentally appropriate words to communicate with the child?', compliance: 70.91, level: 'Medium' },
    { pillar: 'COMMUNICATION', metric: 'Was the phlebotomist able to gauge non-verbal cues of discomfort in the child or family\'s behavior?', compliance: 89.66, level: 'High' },
    { pillar: 'COMMUNICATION', metric: 'Did the phlebotomist effectively address the discomfort expressed through non-verbal cues by the child effectively?', compliance: 34.48, level: 'Low' },
    { pillar: 'COMMUNICATION', metric: 'Did the phlebotomist sufficiently apply the OneVoice™ approach?', compliance: 94.55, level: 'High' },
    { pillar: 'COMFORT POSITIONS', metric: 'Did the child life specialist or phlebotomist suggest the age-appropriate comfort position for each patient?', compliance: 90.91, level: 'High' },
    { pillar: 'ALTERNATE FOCUS', metric: 'Was there a process of exploring alternate focus techniques/options for both, the family, and the child before and during the period of drawing blood?', compliance: 15.79, level: 'Low' }
  ];

  const getComplianceColor = (level) => {
    switch(level) {
      case 'High': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getLevelBadge = (level) => {
    const colors = {
      'High': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  // Simple bar chart component
  const SimpleBarChart = ({ data, maxValue = 100 }) => (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="w-32 text-xs font-medium text-gray-700 truncate" title={item.metric || item.pillar}>
            {item.metric || item.pillar}
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
            <div 
              className="h-4 rounded-full transition-all duration-300"
              style={{
                width: `${(item.compliance || item.avgCompliance) / maxValue * 100}%`,
                backgroundColor: getComplianceColor(item.level)
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
              {(item.compliance || item.avgCompliance).toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Simple pie chart component
  const SimplePieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    
    return (
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage * 2.51} ${(100 - percentage) * 2.51}`;
              const strokeDashoffset = -cumulativePercentage * 2.51;
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-xs text-gray-600">Metrics</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Comfort PACT Baseline Compliance Analysis
          </h1>
          <p style={{ color: '#6b7280' }}>Interactive Dashboard - Pediatric Care Setting</p>
        </div>

        {/* Executive Summary */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#374151' }}>Executive Summary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '16px', textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>14</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Compliance Metrics</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Behavioral indicators</div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', borderRadius: '8px', padding: '16px', textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>54</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Procedures Observed</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Out patient blood lab procedures</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#f3e8ff', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9333ea' }}>5</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Comfort PACT Pillars</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Bundled approach</div>
              </div>
              <div style={{ backgroundColor: '#fed7aa', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ea580c' }}>Total Compliance: Low</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>42.9% of metrics need improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Compliance Distribution */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>Overall Compliance Distribution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <SimplePieChart data={overallDistribution} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
              {overallDistribution.map((item) => (
                <div 
                  key={item.name} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    border: `1px solid ${item.color}`,
                    backgroundColor: `${item.color}10`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', marginRight: '12px', backgroundColor: item.color }}></div>
                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>behavioral indicators</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Areas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#991b1b', marginBottom: '16px' }}>
              🚨 Critical Priority Areas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#b91c1c', fontWeight: '600' }}>ALTERNATE FOCUS</div>
                <div style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '8px' }}>15.8% compliance - Critical intervention needed</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 out of 1 metric shows low compliance</div>
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#b91c1c', fontWeight: '600' }}>MEDICATION</div>
                <div style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '8px' }}>36.0% compliance - Focus on topical analgesic processes</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 out of 2 metrics shows low compliance</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#14532d', marginBottom: '16px' }}>
              ✅ Strengths to Maintain
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#15803d', fontWeight: '600' }}>COMFORT POSITIONS</div>
                <div style={{ fontSize: '0.875rem', color: '#16a34a', marginBottom: '8px' }}>90.9% compliance - Excellent performance</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 out of 1 metric shows high compliance</div>
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                <div style={{ color: '#15803d', fontWeight: '600' }}>OneVoice™ Approach</div>
                <div style={{ fontSize: '0.875rem', color: '#16a34a', marginBottom: '8px' }}>94.55% compliance - Outstanding execution</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Best performing individual metric</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar Performance Ranking */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>Pillar Performance Ranking</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {pillarPerformance.map((pillar) => (
              <div 
                key={pillar.pillar} 
                style={{ 
                  borderRadius: '8px', 
                  padding: '16px', 
                  textAlign: 'center', 
                  border: '2px solid',
                  borderColor: pillar.level === 'High' ? '#22c55e' : pillar.level === 'Medium' ? '#f59e0b' : '#ef4444',
                  backgroundColor: pillar.level === 'High' ? '#f0fdf4' : pillar.level === 'Medium' ? '#fef3c7' : '#fef2f2'
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>#{pillar.rank}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '12px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {pillar.pillar}
                </div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  marginBottom: '4px',
                  color: pillar.level === 'High' ? '#16a34a' : pillar.level === 'Medium' ? '#d97706' : '#dc2626'
                }}>
                  {pillar.avgCompliance}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{pillar.level} Compliance</div>
              </div>
            ))}
          </div>
          <SimpleBarChart data={pillarPerformance} />
        </div>

        {/* Detailed Metrics */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>In-Depth Compliance Metrics</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Pillar</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Behavioral Indicator</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Exact Compliance %</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Level</th>
                </tr>
              </thead>
              <tbody>
                {detailedMetrics.map((metric, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '500', color: '#111827' }}>
                      {metric.pillar}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151', maxWidth: '400px' }}>
                      <div style={{ fontSize: '0.875rem' }} title={metric.metric}>
                        {metric.metric}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '1.125rem' }}>
                      {metric.compliance.toFixed(2)}%
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '4px 12px', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        backgroundColor: metric.level === 'High' ? '#dcfce7' : metric.level === 'Medium' ? '#fef3c7' : '#fee2e2',
                        color: metric.level === 'High' ? '#166534' : metric.level === 'Medium' ? '#92400e' : '#991b1b'
                      }}>
                        {metric.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '24px' }}>
          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            <p style={{ fontWeight: '500', marginBottom: '8px' }}>Methodology Notes</p>
            <p>Compliance Levels: High (≥80%) | Medium (50-79%) | Low (&lt;50%)</p>
            <p style={{ marginTop: '4px' }}>Analysis based on 54 out patient blood lab procedures across 14 behavioral indicators</p>
            <p style={{ marginTop: '4px' }}>The 5 pillars collectively represent the bundled Comfort PACT approach for blood draw pain management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComfortPactDashboard;