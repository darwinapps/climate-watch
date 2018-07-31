module Api
  module V1
    module HistoricalEmissions
      class MetadataSerializer < ActiveModel::Serializer
        attributes :data_source, :sector, :gas, :location, :gwp

        def data_source
          object.data_sources.map do |g|
            metadata_source =
              if g[:name] =~ /^UNFCCC/
                'historical_emissions_unfccc'
              else
                "historical_emissions_#{g[:name]}"
              end
            display_name = g[:name].try(:split, '_').try(:join, ' ')
            g.
              slice(:id, :name, :location_ids, :sector_ids, :gas_ids, :gwp_ids).
              merge(source: metadata_source, display_name: display_name)
          end
        end

        def sector
          object.sectors.map do |g|
            g.slice(:id, :name)
          end
        end

        def gas
          object.gases.map do |g|
            g.slice(:id, :name)
          end
        end

        def location
          object.locations.map do |l|
            l.slice(:id, :iso_code3, :wri_standard_name)
          end
        end

        def gwp
          object.gwps.map do |g|
            g.slice(:id, :name)
          end
        end
      end
    end
  end
end
