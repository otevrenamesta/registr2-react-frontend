module.exports = {
  contract: [{
    id: 1,
    Type: 'contract',
    Publisher: 1,
    Valid: true,
    ResponsiblePersons: ['Gandalf'],
    Anonymised: true,
    Title: 'contract 1',
    Amount: 1234,
    AmountNoVat: 1200,
    ContractType: 'najemni_sml',
    Parties: [2, 3],
    SubjectType: '',
    PriceAnnual: false,
    Currency: 'CZK',
    DateSigned: '1-12-2014',
    ValidFrom: '11-12-2014',
    ValidUntil: null,
    Funding: 'public',
    Competency: 'public',
    CurrentValidContract: '',
    Description: 'contract 1 desc'
  }, {
    id: 2,
    Type: 'contract',
    Publisher: 3,
    Valid: true,
    ResponsiblePersons: ['Gandalf', 'gimly'],
    Anonymised: false,
    Title: 'contract 2',
    Amount: 10000,
    AmountNoVat: 9000,
    ContractType: 'najemni_sml',
    Parties: [2, 3],
    SubjectType: '',
    PriceAnnual: false,
    Currency: 'CZK',
    DateSigned: '10-12-2014',
    ValidFrom: '21-12-2014',
    ValidUntil: null,
    Funding: 'public',
    Competency: 'public',
    CurrentValidContract: '',
    Description: 'contract 2 desc'
  }, {
    id: 3,
    Type: 'contract',
    Publisher: 2,
    Valid: true,
    ResponsiblePersons: ['Saruman', 'Sauron'],
    Anonymised: true,
    Title: 'contract 3',
    Amount: 10000,
    AmountNoVat: 9000,
    ContractType: 'najemni_sml',
    Parties: [3],
    SubjectType: '',
    PriceAnnual: false,
    Currency: 'CZK',
    DateSigned: '10-11-2014',
    ValidFrom: '21-11-2014',
    ValidUntil: '21-11-2016',
    Funding: 'public',
    Competency: 'public',
    CurrentValidContract: '',
    Description: 'contract 3 desc'
  }],
  amendment: [{
    Type: 'amendment',
    Publisher: 3,
    Valid: true,
    ResponsiblePersons: [],
    Anonymised: true,
    Title: 'addon 1',
    Contract: 1
  }, {
    Type: 'amendment',
    Publisher: 2,
    Valid: true,
    ResponsiblePersons: [],
    Anonymised: true,
    Title: 'addon 2',
    Contract: 1
  }],
  attachment: [{
    Type: 'attachment',
    Publisher: 1,
    Valid: true,
    ResponsiblePersons: [],
    Anonymised: false,
    Title: 'attachment 1',
    Contract: 1
  }, {
    Type: 'attachment',
    Publisher: 1,
    Valid: true,
    ResponsiblePersons: [],
    Anonymised: false,
    Title: 'attachment 2',
    Contract: 2
  }],
  publishers: [{
    id: 1,
    Name: 'Mesto Brno',
    NoID: false,
    Country: 'CZE'
  }, {
    id: 2,
    Name: 'Mesto Praha',
    NoID: false,
    Country: 'CZE'
  }, {
    id: 3,
    Name: 'Mesto Tabor',
    NoID: false,
    Country: 'CZE'
  }],
  enums: [{
    'parent': 'tags',
    'slug': 'sport',
    'name': 'Sport'
  }, {
    'parent': 'tags',
    'slug': 'technology',
    'name': 'Technology'
  }, {
    'parent': 'contract_type',
    'slug': 'najemni_sml',
    'name': 'Nájemní smlouva'
  }, {
    'parent': 'contract_type',
    'slug': 'kupni_sml',
    'name': 'Kupní smlouva'
  }, {
    'parent': 'contract_type',
    'slug': 'darovaci_sml',
    'name': 'Darovací smlouva'
  }]
};
