

module.exports.models = {




  migrate: 'alter',



  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },

  },
  dataEncryptionKeys: {
    default: 'tVdQbq2JptoPp4oXGT94kKqF72iV0VKY/cnt7SjL7Ik='
  },


};
