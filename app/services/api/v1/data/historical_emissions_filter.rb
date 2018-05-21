module Api
  module V1
    module Data
      class HistoricalEmissionsFilter
        def initialize(params)
          @query = ::HistoricalEmissions::RecordPerYear.
            joins(:data_source, :gwp, :location, :sector, :gas)
          initialize_filters(params)
        end

        def call
          apply_filters
          @query.
            select(self.class.select_columns).
            group(self.class.group_columns)
        end

        def self.column_aliases
          select_columns_with_aliases.map do |column, column_alias|
            column_alias || column
          end
        end

        private

        def self.select_columns_with_aliases
          [
            ['id'],
            ['historical_emissions_data_sources.name', 'data_source'],
            ['historical_emissions_gwps.name', 'gwp'],
            ['locations.iso_code3', 'iso_code3'],
            ['locations.wri_standard_name', 'region'],
            ['historical_emissions_gases.name', 'gas'],
            ['historical_emissions_sectors.name', 'sector'],
            [
              "ARRAY_AGG(('{\"year\": ' || year || ', \"value\": ' || value || '}')::jsonb)",
              'emissions'
            ]
          ]
        end

        def self.select_columns
          select_columns_with_aliases.map do |column, column_alias|
            if column_alias
              [column, 'AS', column_alias].join(' ')
            else
              column
            end
          end
        end

        def self.group_columns
          columns = select_columns_with_aliases.map(&:first)
          columns.pop
          columns
        end

        def initialize_filters(params)
          # integer arrays
          [
            :source_ids, :gwp_ids, :gas_ids, :sector_ids
          ].map do |param_name|
            if params[param_name].present? && params[param_name].is_a?(Array)
              value = params[param_name].map(&:to_i)
            end
            instance_variable_set(:"@#{param_name}", value)
          end
          @regions = params[:regions]
          @start_year = params[:start_year]
          @end_year = params[:end_year]
        end

        def apply_filters
          @query = @query.where(data_source_id: @source_ids) if @source_ids
          @query = @query.where(gwp_id: @gwp_ids) if @gwp_ids
          @query = @query.where(
            'historical_emissions_locations.iso_code3' => @regions
          ) if @regions
          @query = @query.where(gas_id: @gas_ids) if @gas_ids
          @query = @query.where(sector_id: @sector_ids) if @sector_ids
          @query = @query.where('year >= ?', @start_year) if @start_year
          @query = @query.where('year <= ?', @end_year) if @end_year
        end
      end
    end
  end
end

