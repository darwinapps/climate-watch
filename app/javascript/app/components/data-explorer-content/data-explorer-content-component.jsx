import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DataExplorerProvider from 'providers/data-explorer-provider/data-explorer-provider';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import Table from 'components/table';
import MetadataText from 'components/metadata-text';
import AnchorNav from 'components/anchor-nav';
import NoContent from 'components/no-content';
import Loading from 'components/loading';
import Button from 'components/button';
import ModalDownload from 'components/modal-download';
import anchorNavLightTheme from 'styles/themes/anchor-nav/anchor-nav-light.scss';
import { toStartCase } from 'app/utils';
import cx from 'classnames';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash/isEmpty';
import DataExplorerFilters from './data-explorer-filters';
import ApiDocumentation from './api-documentation/api-documentation';
import styles from './data-explorer-content-styles.scss';

const FEATURE_DATA_SURVEY = process.env.FEATURE_DATA_SURVEY === 'true';

class DataExplorerContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderTable() {
    const {
      data,
      firstColumnHeaders,
      loading,
      handleSortChange,
      search,
      titleLinks
    } = this.props;
    if (loading) return <Loading light className={styles.loader} />;
    if (data && data.length) {
      const columns = data && Object.keys(data[0]);
      const sortBy =
        search.sort_col ||
        columns.find(c => firstColumnHeaders.includes(c)) ||
        columns[0];
      return (
        <Table
          data={data}
          rowHeight={60}
          sortBy={sortBy}
          sortDirection={search.sort_dir}
          firstColumnHeaders={firstColumnHeaders}
          horizontalScroll
          titleLinks={titleLinks}
          handleSortChange={handleSortChange}
        />
      );
    }
    return <NoContent message={'No data'} className={styles.noData} />;
  }

  renderMeta() {
    const { meta, loadingMeta, section } = this.props;
    if (loadingMeta) return <Loading light className={styles.loader} />;
    const noContentMessage =
      section === 'emission-pathways'
        ? 'Select a model, scenario or indicator'
        : 'Select a source';
    return meta && meta.length > 0 ? (
      meta.map((m, i) => (
        <MetadataText
          key={m.technical_title || m.full_name || m.name}
          className={cx(styles.metadataText, { [styles.topPadded]: i > 0 })}
          data={m}
          showAll
        />
      ))
    ) : (
      <NoContent message={noContentMessage} className={styles.noData} />
    );
  }

  render() {
    const {
      section,
      sectionLabel,
      href,
      metadataSection,
      anchorLinks,
      filterQuery,
      query,
      handleDownloadModalOpen,
      handleDataDownload,
      handlePageChange,
      pageCount,
      initialPage,
      loading,
      data,
      search,
      selectedOptions
    } = this.props;

    const downloadButtonText = isEmpty(selectedOptions)
      ? `Download ${toStartCase(sectionLabel)} data`
      : 'Download selected data';
    return (
      <div>
        <DataExplorerProvider
          section={section}
          query={filterQuery}
          page={search.page}
        />
        <RegionsProvider />
        <CountriesProvider />
        <div className={styles.filtersContainer}>
          <DataExplorerFilters section={section} />
        </div>
        <AnchorNav
          links={anchorLinks}
          theme={anchorNavLightTheme}
          query={query}
        />
        <div className={styles.tableContainer}>
          {metadataSection ? this.renderMeta() : this.renderTable()}
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} href={href} color="plain">
            {`View in ${toStartCase(sectionLabel)}`}
          </Button>
          {!loading && data && !metadataSection ? (
            <ReactPaginate
              containerClassName={styles.paginate}
              previousLabel="<"
              nextLabel=">"
              breakLabel={<span className={styles.more}>...</span>}
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              initialPage={initialPage}
              activeClassName={styles.active}
            />
          ) : (
            <div className={styles.blank} />
          )}
          <Button
            className={styles.button}
            onClick={
              FEATURE_DATA_SURVEY ? handleDownloadModalOpen : handleDataDownload
            }
            color="yellow"
            disabled={!data}
          >
            {downloadButtonText}
          </Button>
        </div>
        <ApiDocumentation section={section} />
        {FEATURE_DATA_SURVEY && <ModalDownload />}
      </div>
    );
  }
}

DataExplorerContent.propTypes = {
  section: PropTypes.string.isRequired,
  sectionLabel: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleDownloadModalOpen: PropTypes.func.isRequired,
  handleDataDownload: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object,
  metadataSection: PropTypes.bool,
  data: PropTypes.array,
  meta: PropTypes.array,
  firstColumnHeaders: PropTypes.array,
  loading: PropTypes.bool,
  loadingMeta: PropTypes.bool,
  href: PropTypes.string,
  anchorLinks: PropTypes.array,
  filterQuery: PropTypes.string,
  query: PropTypes.string,
  pageCount: PropTypes.number,
  search: PropTypes.object,
  initialPage: PropTypes.number,
  titleLinks: PropTypes.array
};

DataExplorerContent.defaultProps = {
  hasParamsReady: false
};

export default DataExplorerContent;
