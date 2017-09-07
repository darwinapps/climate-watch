module Api
  module V1
    module CaitIndc
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :name
        attribute :slug
        attribute :category_id, if: -> { object.category_id }
        attribute :labels
        attribute :locations

        def labels
          IndexedSerializer.serialize(
            object.labels,
            each_serializer: LabelSerializer,
            &:id
          )
        end

        def locations
          IndexedSerializer.serialize(
            object.values,
            each_serializer: ValueSerializer
          ) do |v|
            v.location.iso_code3
          end
        end
      end
    end
  end
end