/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require('car-service-bookings/data/dao/Garage/Brands.js')

exports.getTile = function() {
	return {
		'name': 'Brands',
		'group': 'Garage',
		'icon': 'globe',
		'location': '/services/v3/web/car-service-bookings/ui/Garage/index.html',
		'count': dao.count(),
		'order': '100'
	};
};
