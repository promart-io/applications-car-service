/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require('car-service-bookings/data/dao/Bookings/Bookings.js')

exports.getTile = function() {
	return {
		'name': 'Bookings',
		'group': 'Bookings',
		'icon': 'bars',
		'location': '/services/v3/web/car-service-bookings/ui/Bookings/index.html',
		'count': dao.count(),
		'order': '100'
	};
};
