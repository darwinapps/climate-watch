module HistoricalEmissions
  class Record < ApplicationRecord
    has_many :normalised_records,
             class_name: 'HistoricalEmissions::NormalisedRecord',
             foreign_key: :id
    belongs_to :location
    belongs_to :data_source, class_name: 'HistoricalEmissions::DataSource'
    belongs_to :sector, class_name: 'HistoricalEmissions::Sector'
    belongs_to :gas, class_name: 'HistoricalEmissions::Gas'
    belongs_to :gwp, class_name: 'HistoricalEmissions::Gwp'

    def self.find_by_params(params)
      records = ::HistoricalEmissions::Record.
        includes(
          :location,
          :data_source,
          :sector,
          :gas,
          :gwp
        )

      filters(records, params)
    end

    private_class_method def self.filters(records, params)
      unless params[:location].blank?
        iso_codes = params[:location].split(',')
        locations = Location.where(iso_code3: iso_codes)
        location_ids =
          if iso_codes.include? 'NONANNEXI'
            locations.joins(:location_members).pluck(:member_id)
          else
            locations.pluck(:id)
          end
        records = records.where(
          location_id: location_ids
        )
      end

      {
        historical_emissions_gases: :gas,
        historical_emissions_data_sources: :source,
        historical_emissions_sectors: :sector
      }.each do |k, v|
        records = records.where(k => {id: params[v].split(',')}) if params[v]
      end

      records = records.where(gwp_id: params[:gwp]) if params[:gwp]

      records
    end
  end
end
