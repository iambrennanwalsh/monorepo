import { basename, dirname } from 'path'

export default {
	resolveSnapshotPath: testPath =>
		`${dirname(testPath)}/${basename(testPath).split('.').shift()}.snap.js`,

	resolveTestPath: snapshotFilePath =>
		`${dirname(snapshotFilePath)}/${basename(snapshotFilePath)
			.split('.')
			.shift()}.spec.tsx`,
	testPathForConsistencyCheck: 'components/test/src/Component.spec.tsx'
}
