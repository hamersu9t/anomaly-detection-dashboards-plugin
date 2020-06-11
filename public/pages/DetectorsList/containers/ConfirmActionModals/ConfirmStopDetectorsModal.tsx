/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React, { useState } from 'react';
import {
  EuiOverlayMask,
  EuiCallOut,
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalHeader,
  EuiModalFooter,
  EuiModalBody,
  EuiModalHeaderTitle,
  EuiLoadingSpinner,
} from '@elastic/eui';
// @ts-ignore
import { toastNotifications } from 'ui/notify';
//@ts-ignore
import chrome from 'ui/chrome';
import { Monitor } from '../../../../models/interfaces';
import { DetectorListItem } from '../../../../models/interfaces';
import { Listener } from '../../../../utils/utils';
import { EuiSpacer } from '@elastic/eui';
import { getNamesAndMonitorsGrid } from './utils/helpers';

interface ConfirmStopDetectorsModalProps {
  detectors: DetectorListItem[];
  monitors: { [key: string]: Monitor };
  onHide(): void;
  onConfirm(): void;
  onStopDetectors(listener?: Listener): void;
  isListLoading: boolean;
}

export const ConfirmStopDetectorsModal = (
  props: ConfirmStopDetectorsModalProps
) => {
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const isLoading = isModalLoading || props.isListLoading;
  return (
    <EuiOverlayMask>
      <EuiModal onClose={props.onHide}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            {'Are you sure you want to stop the selected detectors?'}&nbsp;
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiCallOut
            title="The following detectors will be stopped. Any associated monitors will
           not be able to receive any anomaly results to generate alerts."
            color="warning"
            iconType="alert"
          ></EuiCallOut>
          <EuiSpacer size="m" />
          <div>
            {isLoading ? (
              <EuiLoadingSpinner size="xl" />
            ) : (
              getNamesAndMonitorsGrid(props.detectors, props.monitors)
            )}
          </div>
        </EuiModalBody>
        <EuiModalFooter>
          {isLoading ? null : (
          <EuiButtonEmpty
            data-test-subj="cancelButton"
            onClick={props.onHide}
          >
            Cancel
          </EuiButtonEmpty>
          )}
          <EuiButton
            data-test-subj="confirmButton"
            color="primary"
            fill
            isLoading={isLoading}
            onClick={async () => {
              setIsModalLoading(true);
              props.onStopDetectors();
              props.onConfirm();
            }}
          >
            {'Stop detectors'}
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
