import {
	INodeProperties,
} from 'n8n-workflow';

export const itemOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
			},
		},
		options: [
			{
				name: 'Create or Update',
				value: 'upsert',
				description: 'Create a new record, or update the current one if it already exists (upsert/put)',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an item',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all items',
			},
		],
		default: 'upsert',
	},
] as INodeProperties[];

export const itemFields = [
	// ----------------------------------
	//              all
	// ----------------------------------
	{
		displayName: 'Table Name',
		name: 'tableName',
		description: 'Table to operate on',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'item',
				],
			},
		},
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getTables',
		},
	},

	// ----------------------------------
	//           upsert
	// ----------------------------------
	{
		displayName: 'Data to Send',
		name: 'dataToSend',
		type: 'options',
		options: [
			{
				name: 'Auto-map Input Data to Columns',
				value: 'autoMapInputData',
				description: 'Use when node input properties match destination column names',
			},
			{
				name: 'Define Below for Each Column',
				value: 'defineBelow',
				description: 'Set the value for each destination column',
			},
		],
		displayOptions: {
			show: {
				operation: [
					'upsert',
				],
			},
		},
		default: 'defineBelow',
		description: 'Whether to insert the input data this node receives in the new row',
	},
	{
		displayName: 'Inputs to Ignore',
		name: 'inputsToIgnore',
		type: 'string',
		displayOptions: {
			show: {
				operation: [
					'upsert',
				],
				dataToSend: [
					'autoMapInputData',
				],
			},
		},
		default: '',
		required: false,
		description: 'List of input properties to avoid sending, separated by commas. Leave empty to send all properties.',
		placeholder: 'Enter properties...',
	},
	{
		displayName: 'Fields to Send',
		name: 'fieldsUi',
		placeholder: 'Add Field',
		type: 'fixedCollection',
		typeOptions: {
			multipleValueButtonText: 'Add Field to Send',
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: [
					'upsert',
				],
				dataToSend: [
					'defineBelow',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Field',
				name: 'fieldValues',
				values: [
					{
						displayName: 'Field ID',
						name: 'fieldId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Field Value',
						name: 'fieldValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'upsert',
				],
			},
		},
		options: [
			{
				displayName: 'Expression Attribute Values',
				name: 'eavUi',
				description: 'Substitution tokens for attribute names in an expression.<br>Only needed when the parameter "condition expression" is set',
				placeholder: 'Add Attribute Value',
				type: 'fixedCollection',
				default: '',
				required: true,
				typeOptions: {
					multipleValues: true,
					minValue: 1,
				},
				options: [
					{
						name: 'eavValues',
						displayName: 'Expression Attribute Vaue',
						values: [
							{
								displayName: 'Attribute',
								name: 'attribute',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Number',
										value: 'N',
									},
									{
										name: 'String',
										value: 'S',
									},
								],
								default: 'S',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Condition Expression',
				name: 'conditionExpression',
				type: 'string',
				default: '',
				description: 'A condition that must be satisfied in order for a conditional upsert to succeed. <a target="_blank" href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html">View details</a>',
			},
			{
				displayName: 'Expression Attribute Names',
				name: 'eanUi',
				placeholder: 'Add Expression',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'eanValues',
						displayName: 'Expression',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'One or more substitution tokens for attribute names in an expression. <a target="_blank" href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html">View details</a>',
			},
		],
	},

	// ----------------------------------
	//              delete
	// ----------------------------------
	{
		displayName: 'Return',
		name: 'returnValues',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'delete',
				],
			},
		},
		options: [
			{
				name: 'Attribute Values',
				value: 'ALL_OLD',
				description: 'The content of the old item is returned',
			},
			{
				name: 'Nothing',
				value: 'NONE',
				description: 'Nothing is returned',
			},
		],
		default: 'NONE',
		description: 'Use ReturnValues if you want to get the item attributes as they appeared before they were deleted',
	},
	{
		displayName: 'Keys',
		name: 'keysUi',
		type: 'fixedCollection',
		placeholder: 'Add Key',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'delete',
				],
			},
		},
		options: [
			{
				displayName: 'Key',
				name: 'keyValues',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Binary',
								value: 'B',
							},
							{
								name: 'Number',
								value: 'N',
							},
							{
								name: 'String',
								value: 'S',
							},
						],
						default: 'S',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
		description: 'Item\'s primary key. For example, with a simple primary key, you only need to provide a value for the partition key.<br>For a composite primary key, you must provide values for both the partition key and the sort key',
	},
	{
		displayName: 'Simple',
		name: 'simple',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'delete',
				],
				returnValues: [
					'ALL_OLD',
				],
			},
		},
		default: true,
		description: 'Whether to return a simplified version of the response instead of the raw data',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'delete',
				],
			},
		},
		options: [
			{
				displayName: 'Condition Expression',
				name: 'conditionExpression',
				type: 'string',
				default: '',
				description: 'A condition that must be satisfied in order for a conditional delete to succeed',
			},
			{
				displayName: 'Expression Attribute Names',
				name: 'eanUi',
				placeholder: 'Add Expression',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'eanValues',
						displayName: 'Expression',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'One or more substitution tokens for attribute names in an expression. Check <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html" target="_blank">Info</a>',
			},
			{
				displayName: 'Expression Attribute Values',
				name: 'expressionAttributeUi',
				description: 'Substitution tokens for attribute names in an expression.<br>Only needed when the parameter "condition expression" is set',
				placeholder: 'Add Attribute Value',
				type: 'fixedCollection',
				default: '',
				required: true,
				typeOptions: {
					multipleValues: true,
					minValue: 1,
				},
				options: [
					{
						name: 'expressionAttributeValues',
						displayName: 'Expression Attribute Vaue',
						values: [
							{
								displayName: 'Attribute',
								name: 'attribute',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Number',
										value: 'N',
									},
									{
										name: 'String',
										value: 'S',
									},
								],
								default: 'S',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
	},

	// ----------------------------------
	//              get
	// ----------------------------------
	{
		displayName: 'Select',
		name: 'select',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'get',
				],
			},
		},
		options: [
			{
				name: 'All Attributes',
				value: 'ALL_ATTRIBUTES',
			},
			{
				name: 'All Projected Attributes',
				value: 'ALL_PROJECTED_ATTRIBUTES',
			},
			{
				name: 'Specific Attributes',
				value: 'SPECIFIC_ATTRIBUTES',
				description: 'Select them in Attributes to Select under Additional Fields',
			},
		],
		default: 'ALL_ATTRIBUTES',
	},
	{
		displayName: 'Simple',
		name: 'simple',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'get',
				],
				select: [
					'ALL_PROJECTED_ATTRIBUTES',
					'ALL_ATTRIBUTES',
				],
			},
		},
		default: true,
		description: 'Whether to return a simplified version of the response instead of the raw data',
	},
	{
		displayName: 'Keys',
		name: 'keysUi',
		type: 'fixedCollection',
		placeholder: 'Add Key',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'get',
				],
			},
		},
		options: [
			{
				displayName: 'Key',
				name: 'keyValues',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Binary',
								value: 'B',
							},
							{
								name: 'Number',
								value: 'N',
							},
							{
								name: 'String',
								value: 'S',
							},
						],
						default: 'S',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
		description: 'Item\'s primary key. For example, with a simple primary key, you only need to provide a value for the partition key.<br>For a composite primary key, you must provide values for both the partition key and the sort key',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'get',
				],
			},
		},
		options: [
			{
				displayName: 'Attributes to Select',
				name: 'projectionExpression',
				type: 'string',
				placeholder: 'id, name',
				default: '',
			},
			{
				displayName: 'Expression Attribute Names',
				name: 'eanUi',
				placeholder: 'Add Expression',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'eanValues',
						displayName: 'Expression',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'One or more substitution tokens for attribute names in an expression. <a href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html" target="_blank">View details</a>',
			},
			{
				displayName: 'Read Type',
				name: 'readType',
				type: 'options',
				options: [
					{
						name: 'Strongly consistent read',
						value: 'stronglyConsistentRead',
					},
					{
						name: 'Eventually consistent read',
						value: 'eventuallyConsistentRead',
					},
				],
				default: 'eventuallyConsistentRead',
				description: 'Type of read to perform on the table. <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html" target="_blank">View details</a>',
			},
		],
	},

	// ----------------------------------
	//              Get All
	// ----------------------------------
	{
		displayName: 'Key Condition Expression',
		name: 'keyConditionExpression',
		description: 'Condition to determine the items to be retrieved. The condition must perform an equality test<br>on a single partition key value, in this format: <code>partitionKeyName = :partitionkeyval</code>',
		placeholder: 'id = :id',
		default: '',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Expression Attribute Values',
		name: 'eavUi',
		description: 'Substitution tokens for attribute names in an expression',
		placeholder: 'Add Attribute Value',
		type: 'fixedCollection',
		default: '',
		required: true,
		typeOptions: {
			multipleValues: true,
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
			},
		},
		options: [
			{
				name: 'eavValues',
				displayName: 'Expression Attribute Vaue',
				values: [
					{
						displayName: 'Attribute',
						name: 'attribute',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Number',
								value: 'N',
							},
							{
								name: 'String',
								value: 'S',
							},
						],
						default: 'S',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'How many results to return',
	},
	{
		displayName: 'Select',
		name: 'select',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
			},
		},
		options: [
			{
				name: 'All Attributes',
				value: 'ALL_ATTRIBUTES',
			},
			{
				name: 'All Projected Attributes',
				value: 'ALL_PROJECTED_ATTRIBUTES',
			},
			{
				name: 'Count',
				value: 'COUNT',
			},
			{
				name: 'Specific Attributes',
				value: 'SPECIFIC_ATTRIBUTES',
				description: 'Select them in Attributes to Select under Additional Fields',
			},
		],
		default: 'ALL_ATTRIBUTES',
	},
	{
		displayName: 'Simple',
		name: 'simple',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
				select: [
					'ALL_PROJECTED_ATTRIBUTES',
					'ALL_ATTRIBUTES',
					'SPECIFIC_ATTRIBUTES',
				],
			},
		},
		default: true,
		description: 'Whether to return a simplified version of the response instead of the raw data',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'item',
				],
				operation: [
					'getAll',
				],
			},
		},
		options: [
			{
				displayName: 'Index Name',
				name: 'indexName',
				description: 'Name of the index to query. It can be any <br>secondary local or global index on the table.',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Attributes to Select',
				name: 'projectionExpression',
				type: 'string',
				default: '',
				description: 'Text that identifies one or more attributes to retrieve from the table.<br>These attributes can include scalars, sets, or elements of a JSON document. The attributes<br>in the expression must be separated by commas',
			},
			{
				displayName: 'Filter Expression',
				name: 'filterExpression',
				type: 'string',
				default: '',
				description: 'Text that contains conditions that DynamoDB applies after the Query operation,<br>but before the data is returned. Items that do not satisfy the FilterExpression criteria</br>are not returned',
			},
			{
				displayName: 'Expression Attribute Names',
				name: 'eanUi',
				placeholder: 'Add Expression',
				type: 'fixedCollection',
				default: '',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'eanValues',
						displayName: 'Expression',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'One or more substitution tokens for attribute names in an expression. Check <a target="_blank" href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html">Info</a>',
			},
		],
	},
] as INodeProperties[];
