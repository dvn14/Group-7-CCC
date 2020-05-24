import { Layer, Control, DomUtil } from 'leaflet';
import { LayerContainer, Map, MapControl, MapControlProps } from 'react-leaflet';

export interface baseLayer {
  name: string;
  title: string;
}

export interface overlay {
  checked: boolean;
  groupTitle: string;
  name: string;
  title: string;
}

export interface RLGLCProps extends MapControlProps {
  baseLayers: Array<baseLayer>;
  checkedBaseLayer: string;
  exclusiveGroups?: Array<string>;
  overlays?: Array<overlay>;
  onBaseLayerChange?(id: string): void;
  onOverlayChange?(newOverlays: Array<overlay> ): void
  leaflet?: {
    map?: Map;
    pane?: string;
    layerContainer?: LayerContainer;
    popupContainer?: Layer;
  }
}

export class ReactLeafletGroupedLayerControl extends MapControl<RLGLCProps> {
  public div: HTMLElement;
  public groups: Array<string>;
  public state: { open: boolean };
  public props: RLGLCProps;
  public id: number;
}
