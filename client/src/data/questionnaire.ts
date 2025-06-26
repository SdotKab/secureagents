// src/data/questionnaire.ts

export const questionnaire = [
  {
    name: 'Network Security',
    questions: [
      { id: 'ns-q1', text: 'Are firewalls configured and regularly updated?' },
      { id: 'ns-q2', text: 'Are intrusion detection systems in place?' },
      { id: 'ns-q3', text: 'Is remote access secured using VPN or MFA?' },
      // Add up to 15 total
    ],
  },
  {
    name: 'Access Control',
    questions: [
      { id: 'ac-q1', text: 'Are user roles clearly defined and enforced?' },
      { id: 'ac-q2', text: 'Is MFA required for privileged accounts?' },
      { id: 'ac-q3', text: 'Is access reviewed regularly?' },
      // ...
    ],
  },
  // ... add the other 8 categories similarly
];
