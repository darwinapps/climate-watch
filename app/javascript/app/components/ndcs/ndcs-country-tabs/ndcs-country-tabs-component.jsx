import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';

import CountryNdcOverview from 'components/country/country-ndc-overview';
import NDCCountryAccordion from 'components/ndcs/ndcs-country-accordion/ndcs-country-accordion';

const tabs = [
  {
    key: 'summary',
    component: () => createElement(CountryNdcOverview, { textColumns: true }),
    label: 'Summary'
  },
  {
    key: 'overview',
    component: () => createElement(NDCCountryAccordion, { category: 'overview' }),
    label: 'Overview',
  },
  {
    key: 'mitigation',
    component: () => createElement(NDCCountryAccordion, { category: 'mitigation' }),
    label: 'Mitigation',
  },
  {
    key: 'adaptation',
    component: () => createElement(NDCCountryAccordion, { category: 'adaptation' }),
    label: 'Adaptation',
  },
  {
    key: 'sectoral-information',
    component: () => createElement(NDCCountryAccordion, { category: 'sectoral_information' }),
    label: 'Sectoral Information',
  },
];

class NdcsCountryTabs extends PureComponent {
  constructor() {
    super();

    this.state = {
      activeTabKey: 'summary',
    };

    this.setActiveTabKey = this.setActiveTabKey.bind(this);
  }

  setActiveTabKey(activeTabKey) {
    this.setState({ activeTabKey });
  }

  render() {
    const { activeTabKey } = this.state;

    const activeTab = tabs.find(tab => tab.key === activeTabKey);

    return (
      <div>
        {
          tabs.map(tab => <div
            key={tab.key}
            onClick={() => this.setActiveTabKey(tab.key)}
            className={`ndcs-country-tab${tab.key === activeTabKey ? '-active' : ''}`}
          >
            {tab.label}
          </div>)
        }
        { activeTab.component() }
      </div>
    );
  }
}

NdcsCountryTabs.propTypes = {
};

export default NdcsCountryTabs;
